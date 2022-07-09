import {
    Center,
    FormControl,
    VStack,
    Text,
    Image,
    Box,
    Input,
    Alert,
    AlertDescription,
    AlertTitle,
    AlertIcon,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { useState } from "react";
import { useResetpassword } from "../hooks/useResetpassword";
import { Link } from "react-router-dom";
import logo from "../image/logo.png";

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const { error, resetpassword } = useResetpassword();
    const [success, setSuccess] = useState("");
    const [finalerror, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);

        await resetpassword(email);

        setError(error);
        console.log(finalerror);

        const checker = () => {
            if (finalerror === "") {
                setSuccess(true);
                console.log("Set success to true");
            }
        };
        setTimeout(checker, 500);
        setError("");
    };
    return (
        <>
        {/* <header><img src={logo}> </img></header> */}
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
                    Forget Password
                </Text>
                
                <Text
                    fontSize="1vw"
                    fontWeight="regular"
                    color="#000000"
                    lineHeight="2"
                    align="left"
                    marginBottom="1vw"
                >
                    Enter your registered email address below. A link will be sent to your email account to reset password.
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
                                Send
                            </Box>
                            <Box width="22vw">
                      {(error && (
                        <Alert
                          status="error"
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <AlertIcon />
                          <AlertTitle>Error: </AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )) ||
                        (success && (
                          <Alert
                            status="success"
                            alignItems="center"
                            justifyContent="center"
                            textAlign="center"
                          >
                            <AlertIcon />
                            <VStack alignItems="left" spacing={0}>
                              <AlertTitle align="left">Success! </AlertTitle>
                              <AlertDescription maxWidth="444px">
                                Please check your email for the password reset
                                link
                              </AlertDescription>
                            </VStack>
                          </Alert>
                        ))}
                    </Box>
                        </VStack>
                    </form>
                </Formik>

            </Box>

        </Center>
        </>
    );
}

export default ForgetPassword;