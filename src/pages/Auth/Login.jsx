import TSForm from "../../components/form/TSForm";
import TSInput from "../../components/form/TSInput";

import { useAppDispatch } from './../../redux/hooks';
import { verifyToken } from './../../utils/verifyToken';
import { setUser } from "../../redux/fetures/auth/authSlice";
import { Button, Row } from "antd";
import authApi from './../../redux/fetures/auth/authApi';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login] = authApi.useLoginMutation();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const res = await login(data).unwrap();          
            const token = res.data.accessToken;
            const user = verifyToken(token);
            dispatch(setUser({ user, token }));
            navigate("/dashboard")
            
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <TSForm onSubmit={onSubmit}>
                <TSInput type="text" name="email" label="Email"></TSInput>
                <TSInput type="text" name="password" label="Password"></TSInput>
                <Button htmlType="submit">Login</Button>
            </TSForm>
        </Row>
    );
};

export default Login;
