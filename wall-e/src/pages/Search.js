import TopBar from "../components/TopBar";
import { Box, Center, VStack, HStack, Text, FormControl, Select, Input } from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { useState, useEffect } from "react";
import { useCollection } from '../hooks/useCollection';
// specific for UID of users
//import { useAuthContext } from "../hooks/useAuthContext";

function Search() {
    const [category, setCategory] = useState("");
    const [foodName, setfoodName] = useState("");
    const [streetName, setStreetName] = useState("");
    const [error, setError] = useState(null);
    const [twoDigit, setTwoDigit] = useState("");

    const [postalCode, setPostalCode] = useState("Loading");
    const [listingIndices, setListingIndices] = useState([0]);
    //const { user } = useAuthContext();
    

    var specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    function checkSearchInput(street, food){
        if (specialChars.test(street) || specialChars.test(food)) {
            throw Error ("Please only key in numbers and alphabets into the input field!")
        }
    }


    //const axios = require('axios').default;
    // async function fetchData() {
    //     const { data } = await axios.post(
    //       'http://127.0.0.1:8000/api/posts/',
    //       keywords
    //     )
    //     setFetchedData(data) 
    //   }
    
    //   useEffect(() => {
    //     fetchData()
    //   }, [])
        

    // function PostalCodeAPI(props) {
    //     // const oneMapAPI = "https://developers.onemap.sg/commonapi/search?searchVal=" +
    //     //     props.street.toLowerCase() +
    //     //     "&returnGeom=N&getAddrDetails=Y&pageNum=1";
    //     const oneMapAPI = "https://developers.onemap.sg/commonapi/search?searchVal=revenue&returnGeom=Y&getAddrDetails=Y&pageNum=1";
    //         //console.log(oneMapAPI + "onemapapi")
    //         const [postalCode, setPostalCode] = useState("Loading");
        
    //         fetch(oneMapAPI)
    //             .then((response) => response.json())
    //             .then((data) => setPostalCode(data.results[0].POSTAL))
    //             .catch((error) =>
    //                 setPostalCode(`Unable to retrieve Postal Code: ${error}`)
    //             );

    //     console.log("this is my postal code " + postalCode)
    //     return postalCode;

    // };

    const { documents: listings } = useCollection("listings");

    function getPostalCode(data){
        var results = data.results;
        var postalCodes = results.map((e) => e.POSTAL).filter((e) => e !== "NIL")
        return postalCodes[0]
    }

    //Function that gets results by matching first 2 digits of postal code
    function getResults(postalCodes){

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            console.log(streetName + "this is testin street name")
            checkSearchInput(streetName, foodName);
            //query the oneMAPs API using user's input
            console.log("before set2")
            //console.log(PostalCodeAPI(streetName) + "this is the one MAP aPI");

            const oneMapAPI = "https://developers.onemap.sg/commonapi/search?searchVal=" +
            streetName.toLowerCase() +
              "&returnGeom=N&getAddrDetails=Y&pageNum=1";
            //console.log(oneMapAPI + "onemapapi")
            
        
            fetch(oneMapAPI)
                .then((response) => response.json())
                .then((data) => setPostalCode(getPostalCode(data)))
                .catch((error) =>
                    setPostalCode(`Unable to retrieve Postal Code: ${error}`)
                );

            console.log("this is my postal code " + postalCode)
            console.log(listings)
        

            //setTwoDigit(PostalCodeAPI(streetName));
            var matchedListingsIndices = [];
            var listingPostalCode ="";
            for(let i=0; i<listings.length; i++){
                var listingPostalCode = listings[i].Location
                console.log("bbb" + listingPostalCode)

                if(listingPostalCode.substr(0,1) === postalCode.substr(0,1)){
                    matchedListingsIndices.push(i)
                    console.log("bbb" + matchedListingsIndices)
                }
                console.log(matchedListingsIndices);
            }
            setListingIndices(matchedListingsIndices);

            var displayedListings = matchedListingsIndices.map((i) => listings[i])

            console.log(displayedListings)



            //query our only database with Postal Code that has been extracted && 
            //Display Listings that matches user's category and postal code area (first 2 -TWO- numbers of the postal code)
        } catch (e) {
            setError(e);
            console.error(e);
        }
    };
    return (
        <div>
            <TopBar />
            {/* <PostalCodeAPI street={streetName}></PostalCodeAPI> */}
            <Formik>
                <form>
                    <FormControl isRequired>
                        <HStack spacing="1rem" margin="2vw 15vw 0 5vw">
                            <Box>
                                <Text
                                    fontSize="1.5vw"
                                    fontWeight="semibold"
                                    color="#000000"
                                    lineHeight="1.3"
                                    align="left"
                                >
                                    Category
                                </Text>
                            </Box>
                            <Select
                                variant="filled"
                                placeholder="Choose a Catogory"
                                width="13vw"
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                                height="2vw"
                                fontSize="1.2vw"
                                iconSize="1vw" 
                                bg="#FAEDCD"
                                _hover={{ bg: "#CDC0A1" }}
                                borderRadius="15px"
                            >
                                <option>Fruit</option>
                                <option>Vegetables</option>
                                <option>Starchy Food</option>
                                <option>Protein</option>
                                <option>Dairy</option>
                                <option>Fat</option>
                                <option>Stall Food</option>
                            </Select>

                            <Box>
                                <Text
                                    fontSize="1.5vw"
                                    fontWeight="semibold"
                                    color="#000000"
                                    lineHeight="1.3"
                                    align="left"
                                >
                                    Food/Product Name
                                </Text>
                            </Box>
                            <Field
                                as={Input}
                                id="modulecode"
                                name="academic year"
                                variant="filled"
                                width="14vw"
                                height="1.875vw"
                                placeholder="E.g. Chicken Rice / Baked Beans"
                                onChange={(e) => setfoodName(e.target.value)}
                                value={foodName}
                                bg="#FAEDCD"
                                _hover={{ bg: "#CDC0A1" }}
                                borderRadius="15px"
                            />


                            <Box>
                                <Text
                                    fontSize="1.5vw"
                                    fontWeight="semibold"
                                    color="#000000"
                                    lineHeight="1.3"
                                    align="left"
                                >
                                    Street Name
                                </Text>
                            </Box>
                            <Field
                                as={Input}
                                id="modulecode"
                                name="academic year"
                                variant="filled"
                                width="11.5vw"
                                height="1.875vw"
                                placeholder="E.g. Bishan"
                                onChange={(e) => setStreetName(e.target.value)}
                                value={streetName}
                                bg="#FAEDCD"
                                _hover={{ bg: "#CDC0A1" }}
                                borderRadius="15px"
                            />

                            <Box as="button"
                                height="2vw"
                                lineHeight="1.2"
                                transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                                border="0px"
                                width="7.813vw"
                                borderRadius="15px"
                                fontSize="1.2vw"
                                fontWeight="semibold"
                                bg="#D4A373"
                                borderColor="#ccd0d5"
                                color="#000000"
                                _hover={{ bg: "#CDC0A1" }}
                                _active={{
                                    bg: "#dddfe2",
                                    transform: "scale(0.98)",
                                }}
                                _focus={{
                                    boxShadow:
                                        "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                                }}
                                onClick={handleSubmit}
                            >
                                Enter
                            </Box>
                        </HStack>
                    </FormControl>

                </form>
            </Formik>

            <Box margin="2vw 5vw 0 5vw" bg="#FAEDCD" minHeight="40vw" borderRadius="15px" >

            </Box>
        </div>
    );
}

export default Search