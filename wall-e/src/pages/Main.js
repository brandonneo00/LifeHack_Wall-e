import {
    FormControl,
    Center,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Input,
    Box,
    VStack,
    Grid,
    GridItem,
    Image,
    HStack,
    Button,
    Text,
    Flex,
    Spacer,
} from "@chakra-ui/react";
import Wallpaper from "../image/wallpaper.jpeg";
import Logo from "../image/logo.png";
import { Link, useHistory } from "react-router-dom";

function Main() {
    let history = useHistory();
    const routeChange1 = () => {
        let path = "/Login";
        history.push(path);
    }

    const routeChange2 = () => {
        let path = "/CreateAccount";
        history.push(path);
    }

    return (
        <div className="App">
            <Grid>
                <GridItem padding="2% 3%">
                    <Center>
                        <Image width="5vw" height="4.5vw" src={Logo} alt="Logo" />
                    </Center>

                    <Box margin="1rem 0rem">
                        <Image width="100vw" src={Wallpaper} alt='Wallpaper' />
                    </Box>

                    <Box textAlign="left">
                        <Text
                            fontSize="3vw"
                            fontWeight="bold"
                            color="#000000"
                            lineHeight="2"
                            align="left"
                            paddingLeft="2%"
                        >
                            Mission
                        </Text>
                        <GridItem padding="2%" borderRadius="15px" bg="#E9EDC9">
                        <Text
                            fontSize="2vw"
                            fontWeight="semibold"
                            color="#000000"
                            lineHeight="1.3"
                            align="left"
                        >
                            Our mission at Save Wast-e is to REDUCE food wastage and RESPOND to those in need by REDISTRIBUTING potential food waste from hawkers, store-owners and individuals to those who require it.
                        </Text>
                        </GridItem>

                        <Text
                            fontSize="3vw"
                            fontWeight="bold"
                            color="#000000"
                            lineHeight="2"
                            align="left"
                            paddingLeft="2%"
                            marginTop="2vw"
                        >
                            Goals
                        </Text>
                        <GridItem padding="2%" borderRadius="15px" bg="#FEFAE0">
                        <HStack spacing="1vw">
                            <Text
                                fontSize="2vw"
                                fontWeight="bold"
                                color="#D4A373"
                                lineHeight="1.3"
                                align="left"
                            >
                                REDUCE
                            </Text>
                            <Text
                                fontSize="2vw"
                                fontWeight="semibold"
                                color="#000000"
                                lineHeight="1.3"
                                align="left"
                            >
                                food wastage
                            </Text>
                        </HStack>

                        <HStack>
                            <Text
                                fontSize="2vw"
                                fontWeight="bold"
                                color="#D4A373"
                                lineHeight="1.3"
                                align="left"
                            >
                                REDISTRIBUTE
                            </Text>
                            <Text
                                fontSize="2vw"
                                fontWeight="semibold"
                                color="#000000"
                                lineHeight="1.3"
                                align="left"
                            >
                                potential food waste
                            </Text>
                        </HStack>
                        <HStack>
                            <Text
                                fontSize="2vw"
                                fontWeight="bold"
                                color="#D4A373"
                                lineHeight="1.3"
                                align="left"
                            >
                                RESPOND
                            </Text>
                            <Text
                                fontSize="2vw"
                                fontWeight="semibold"
                                color="#000000"
                                lineHeight="1.3"
                                align="left"
                            >
                                to those in need
                            </Text>
                        </HStack>
                        </GridItem>

                    </Box>

                    <Text
                        fontSize="3vw"
                        fontWeight="bold"
                        color="#000000"
                        lineHeight="2"
                        align="left"
                        paddingLeft="2%"
                        marginTop="2vw"
                    >
                        Get Started By
                    </Text>

                    <HStack spacing="4vw" paddingLeft="2%" marginTop="1rem">
                        <Button
                            variant="link"
                            height="4vw"
                            lineHeight="1.2"
                            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                            border="0px"
                            width="20vw"
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
                            onClick={routeChange2}
                        >
                            Create Account
                        </Button>

                        <Button
                            variant="link"
                            height="4vw"
                            lineHeight="1.2"
                            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                            border="0px"
                            width="20vw"
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
                            onClick={routeChange1}
                        >
                            Login
                        </Button>

                    </HStack>

                </GridItem>
            </Grid>
        </div>
    );
}

export default Main;