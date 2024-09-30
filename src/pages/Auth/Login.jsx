import TSForm from "../../components/form/TSForm";
import TSInput from "../../components/form/TSInput";

import { useAppDispatch } from './../../redux/hooks';
import { verifyToken } from './../../utils/verifyToken';
import { setUser } from "../../redux/fetures/auth/authSlice";
import { Button, Row } from "antd";
import authApi from './../../redux/fetures/auth/authApi';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login] = authApi.useLoginMutation();



    const onSubmit = async (data) => {
        const newDadta = {
            password : data.password,
            email : data.email,
            isActive : true
        }
        try {
            const res = await login(newDadta).unwrap();
            const token = res.data.accessToken;
            const user = verifyToken(token);
            dispatch(setUser({ user, token }));
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <TSForm onSubmit={onSubmit}>
                <TSInput type="text" name="email" label="Email" placeholder="email"></TSInput>
                <TSInput type="text" name="password" label="Password" placeholder="password"></TSInput>
                <p className="font-semibold mb-3">If You Are Not Registred? <Link to="/register" className="text-green-600">Registration</Link> </p>
                <Button htmlType="submit">Login</Button>


            </TSForm>
        </Row>
    );
};

export default Login;
