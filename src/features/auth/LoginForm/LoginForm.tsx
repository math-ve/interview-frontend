import { Box, Button, Checkbox, Link, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginMutation } from '@services';
import { createJwtToken, setStorageToken } from '@utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useLoginFormStyle from './LoginForm.style';

type LoginFormDataT = {
    email: string;
    password: string;
    remember: boolean;
};

function LoginForm() {
    const { classes } = useLoginFormStyle();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const LoginFormSchema = yup.object({
        email: yup.string().email(t('validations.email-invalid')).required(t('validations.email-required')),
        password: yup.string().required(t('validations.password-required')),
    });

    const { register, handleSubmit, control } = useForm<LoginFormDataT>({
        reValidateMode: 'onChange',
        resolver: yupResolver(LoginFormSchema),
    });
    const [login] = useLoginMutation();

    const onSubmit = async (data: LoginFormDataT) => {
        try {
            const body = await login(data).unwrap();

            const jwt = await createJwtToken(body[0])

            setStorageToken(jwt, true)
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box className={classes.container}>
            <form id="login-form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    inputProps={{
                        ...register('email'),
                    }}
                    label={t('labels.email')}
                />
                <TextField
                    inputProps={{
                        ...register('password'),
                    }}
                    label={t('labels.password')}
                    type="password"
                    autoComplete="current-password"
                />
                <Link className={classes.checkbox} component={RouterLink} to="/forgot-password" variant="button">
                    {t('buttons.forgot-password')}
                </Link>
                <Box className={classes.checkbox} mb={2} textAlign="left">
                    <Controller
                        control={control}
                        name="remember"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Checkbox
                                onBlur={onBlur} // notify when input is touched
                                onChange={onChange} // send value to hook form
                                checked={value ?? false}
                                inputRef={ref}
                                inputProps={{
                                    'aria-label': t('labels.remember-me'),
                                }}
                            ></Checkbox>
                        )}
                    />
                </Box>
                <Box mt={6}>
                    <Button type="submit" variant="contained" disableElevation fullWidth>
                        {t('buttons.login')}
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default LoginForm;
