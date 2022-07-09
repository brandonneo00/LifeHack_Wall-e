import React from "react";
import search from "../../image/search.png";
import listing from "../../image/listing.png";
import logo from "../../image/logo.png";
import profile from "../../image/profile.png";
import Logout from "../../image/logout.png";
import { NavLink, useHistory } from "react-router-dom";
import {
    Button,
    VStack,
    HStack,
    Box,
    Text,
    Image,
    IconButton,
    Flex,
    Spacer,
    Center,
} from "@chakra-ui/react";
import "./TopBar.css";
import { useLogout } from "../../hooks/useLogout";
import {
    db,
} from "../../firebase/config";
import { collection, getDocs, query,
    where } from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext";


function TopBar() {
    const { user } = useAuthContext();
    const history = useHistory();
    const { logout } = useLogout();
    const handleLogout = () => {
        let path = "/";
        logout();
        history.push(path);
    }
    var userObj;

    const handleProfile = async () => {
        //creating reference to the userprofiles collection
        const userRef = collection(db, "userprofiles");
        //creating query against the userprofiles collection
        const userQuery = query(userRef,
            where("uid", "==", user.uid));

        //executing the query
        const userQuerySnapshot = await getDocs(userQuery);
        userQuerySnapshot.forEach((ele)=>{
            userObj = ele.data();
        })


    }

    return (
        <div>
            <Flex >
                <Center
                    as="button"
                    w="100%"
                // _hover={{ bg: "#E5E5E5" }}
                // _active={{
                //     bg: "#FFFFFF",
                //     transform: "scale(0.98)",
                // }}

                >
                    <NavLink to="Search" activeClassName="active">
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;
                        <HStack spacing={0} >
                            <Image
                                src={search}
                                alt="search-logo"
                                boxSize="50px"
                                padding="10px"
                                margin="0px 0px 0px 8px"
                            />

                            <Text fontSize="26px" fontWeight="semibold" color="#D4A373">
                                Search
                            </Text>
                        </HStack>
                    </NavLink>
                </Center>
                <Spacer />
                <Center
                    as="button"
                    w="100%"
                // _hover={{ bg: "#E5E5E5" }}
                // _active={{
                //     bg: "#FFFFFF",
                //     transform: "scale(0.98)",
                // }}
                >
                    <NavLink to="Listings" activeClassName="active">
                        &emsp;
                        <HStack spacing={0}>
                            <Image
                                src={listing}
                                alt="search-logo"
                                boxSize="50px"
                                padding="10px"
                                margin="0px 0px 0px 8px"
                            />
                            <Text fontSize="26px" fontWeight="semibold" color="#D4A373">
                                Listings
                            </Text>
                        </HStack>
                    </NavLink>
                </Center>
                <Spacer />
                <Center
                    as="button"
                    w="100%"
                // _hover={{ bg: "#E5E5E5" }}
                // _active={{
                //     bg: "#FFFFFF",
                //     transform: "scale(0.98)",
                // }}
                >
                    <NavLink to="Home" activeClassName="active">
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;
                        <HStack spacing={0}>
                            <Image
                                src={logo}
                                alt="search-logo"
                                width="4.5vw" height="4vw"
                            // boxSize="50px"
                            // padding="10px"
                            // margin="0px 0px 0px 8px"
                            />
                        </HStack>
                    </NavLink>
                </Center>
                <Spacer />
                <Center
                    as="button"
                    w="100%"
                // _hover={{ bg: "#E5E5E5" }}
                // _active={{
                //     bg: "#FFFFFF",
                //     transform: "scale(0.98)",
                // }}
                >
                {/* <Box as="button" onClick={handleProfile}> */}
                    {/* <NavLink to={{pathname: "/Profile", state: {obj: userObj}}} activeClassName="active"> */}
                    <NavLink to="Profile" activeClassName="active">

                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;
                        <HStack spacing={0}>
                            <Image
                                src={profile}
                                alt="search-logo"
                                boxSize="50px"
                                padding="10px"
                                margin="0px 0px 0px 8px"
                            />
                            <Text fontSize="26px" fontWeight="semibold" color="#D4A373">
                                Profile
                            </Text>
                        </HStack>
                    </NavLink>
                    {/* </Box> */}
                </Center>
                <Spacer />
                <Center
                    as="button"
                    w="100%"

                // _hover={{ bg: "#E5E5E5" }}
                // _active={{
                //     bg: "#FFFFFF",
                //     transform: "scale(0.98)",
                // }}
                >

                    <Box as="button" onClick={handleLogout} paddingTop="1.5rem">
                        <HStack spacing={0}>
                            <Image
                                src={Logout}
                                alt="search-logo"
                                boxSize="50px"
                                padding="10px"
                                margin="0px 0px 0px 8px"

                            />
                            <Text fontSize="26px" fontWeight="semibold" color="#D4A373">
                                Logout
                            </Text>
                        </HStack>
                    </Box>

                </Center>
            </Flex>
        </div>
    );
}
export default TopBar;