import {
    Input,
    Box,
    FormControl,
    VStack,
    Alert,
    AlertDescription,
    AlertTitle,
    AlertIcon,
    Text,
    Center,
    Button
} from "@chakra-ui/react";
import React from "react";
import { Formik, Field } from "formik";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { error, login } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    

    return (
        <>
            <Center height="100vh">
                <Box bg="#FAEDCD" padding="2% 4%" borderRadius="15px" width="30vw">
                    <Text
                        fontSize="2.5vw"
                        fontWeight="bold"
                        color="#000000"
                        lineHeight="2"
                        align="left"
                        marginBottom="1vw"
                    >
                        Login
                    </Text>
                    <Formik>
                        <form onSubmit={handleSubmit}>
                            <VStack spacing="1.5vw" align="flex-start">
                                <FormControl isRequired>
                                    <Field
                                        as={Input}
                                        id="email"
                                        name="email"
                                        type="email"
                                        variant="filled"
                                        placeholder="Email Address"
                                        onChange={(e) => setEmail(e.target.value)}
                                        borderRadius="15px"
                                        width="22vw"
                                        height="4vw"
                                        value={email}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <Field
                                        as={Input}
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        variant="filled"
                                        onChange={(e) => setPassword(e.target.value)}
                                        borderRadius="15px"
                                        height="4vw"
                                        margin="0.8vw 0vw"
                                        value={password}
                                    />
                                </FormControl>
                                <Box
                                    height="4vw"
                                    lineHeight="1.2"
                                    transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                                    border="0px"
                                    width="22vw"
                                    borderRadius="15px"
                                    fontSize="1.5vw"
                                    fontWeight="semibold"
                                    bg="#D4A373"
                                    borderColor=""
                                    color="#FEFAE0"
                                    _hover={{ bg: "#AD845B" }}
                                    _active={{
                                        bg: "#D4A373",
                                        transform: "scale(0.98)",
                                        borderColor: "",
                                    }}
                                    _focus={{
                                        boxShadow:
                                            "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                                    }}
                                    as="button"
                                >
                                    Login
                                </Box>
                                {error && (
                                    <Alert
                                        status="error"
                                        alignItems="center"
                                        justifyContent="center"
                                        textAlign="center"
                                        marginTop="1rem"
                                        fontSize="md"
                                    >
                                        <AlertIcon />
                                        <AlertTitle>Error: </AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}
                            </VStack>
                        </form>
                    </Formik>

                    <Center>
                        <Text
                            fontSize="1vw"
                            fontWeight="bold"
                            color="#000000"
                            lineHeight="2"
                            align="left"
                            margin="1vw"
                        >
                            Or
                        </Text>
                    </Center>
                    <VStack spacing="0">
                        <Link to="CreateAccount">
                            <Text fontSize="1.2vw"
                                fontWeight="bold"
                                color="#000000"
                                lineHeight="2"
                                align="left"
                                as="u"
                            >
                                Create Account
                            </Text>
                        </Link>
                        <Link to="ForgetPassword">
                            <Text fontSize="1.2vw"
                                fontWeight="bold"
                                color="#000000"
                                lineHeight="2"
                                align="left"
                                as="u">
                                Forget Password
                            </Text>
                        </Link>
                    </VStack>

                </Box>

            </Center>
        </>
    );
}

export default Login;
