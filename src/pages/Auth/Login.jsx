import TSForm from "../../components/form/TSForm";
import TSInput from "../../components/form/TSInput";

import { useAppDispatch } from './../../redux/hooks';
import { toast } from "react-toastify";
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
        const tostId = toast.loading("Logging in");
        try {
            const res = await login(data).unwrap();          
            const token = res.data.accessToken;
            const user = verifyToken(token);
            dispatch(setUser({ user, token }));
            navigate("/dashboard")
            toast.success(`${user.role} Login SuccessFully`, {
                id: tostId, 
                duration: 3000,
                style: {
                    background: "green",
                    color: "white",
                    width: "250px",
                },
            });
        } catch (err) {
            console.log(err);
            toast.error("Somthing went wrong", { id: tostId, duration: 3000 });
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
