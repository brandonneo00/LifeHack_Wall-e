import {
  Box,
  Center,
  VStack,
  HStack,
  Text,
  Avatar,
  Wrap,
  WrapItem,
  FormControl,
  Flex,
  Spacer,
  Tooltip
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../image/logo.png';
import TopBar from '../components/TopBar';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';
// import { useLocation } from "react-router-dom";
import { useState } from 'react';

function Profile() {
  // const test = {
  //     FirstName: "Tom",
  //     LastName: "Tan",
  //     Address: "Blk123 Bishan St 45",
  //     PostalCode: "123456",
  //     AccountType: "Stall Owner"
  // };
  //const location = useLocation();
  //const { obj } = location.state;
  const [clickBefore, setClickBefore] = useState(false);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [add, setAdd] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');

  const { user } = useAuthContext();
  var userObj;

  const handleClick = async () => {
    //creating reference to the userprofiles collection
    const userRef = collection(db, 'userprofiles');
    //creating query against the userprofiles collection
    const userQuery = query(userRef, where('uid', '==', user.uid));

    //executing the query
    const userQuerySnapshot = await getDocs(userQuery);
    userQuerySnapshot.forEach(ele => {
      userObj = {
        FirstName: ele.data().FirstName,
        LastName: ele.data().LastName,
        Address: ele.data().Address,
        PostalCode: ele.data().PostalCode,
        AccountType: ele.data().AccountType,
      };
    });
    console.log(userObj + 'this is userObj');
    console.log(userObj.PostalCode + ' this is the first name');

    setClickBefore(true);
    setFName(userObj.FirstName);
    setLName(userObj.LastName);
    setAdd(userObj.Address);
    setCode(userObj.PostalCode);
    setType(userObj.AccountType);
  };

  return (
    <div>
      <TopBar />

      {!clickBefore ? (
        <Center height="100vh">
        <Box
          height="6vw"
          lineHeight="1.2"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          width="30vw"
          borderRadius="15px"
          fontSize="2vw"
          fontWeight="semibold"
          bg="#D4A373"
          borderColor=""
          color="#FEFAE0"
          _hover={{ bg: '#AD845B' }}
          _active={{
            bg: '#D4A373',
            transform: 'scale(0.98)',
            borderColor: '',
          }}
          _focus={{
            boxShadow:
              '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
          }}
          as="button"
          onClick={handleClick}
        >
          Click to Show Profile
          </Box>
        </Center>

      ) : (
        <Center>
          <Box bg="#FAEDCD" borderRadius="15px" padding="2% 4%" margin="3%" >
            <Center>
              <Avatar src={logo} width="10vw" height="10vw"></Avatar>
            </Center>
            <VStack align="flex" spacing="1vw">
            <HStack spacing="5vw">
              <VStack spacing={0} align="left">
                <Text
                  fontSize="1vw"
                  fontWeight="bold"
                  color="#000000"
                  lineHeight="2"
                  align="left"
                >
                  {' '}
                  First Name{' '}
                </Text>
                <Box bg="#FFFFFF" borderRadius="15px" width="20vw">
                  <Text
                    fontSize="1.5vw"
                    fontWeight="regular"
                    color="#000000"
                    lineHeight="2"
                    marginLeft="1vw"
                    height="3vw"
                  >
                    {fName}{' '}
                  </Text>
                </Box>
              </VStack>

              <VStack spacing={0} align="left">
                <Text
                  fontSize="1vw"
                  fontWeight="bold"
                  color="#000000"
                  lineHeight="2"
                  align="left"
                >
                  {' '}
                  Last Name
                </Text>
                <Box bg="#FFFFFF" borderRadius="15px" width="10vw">
                  {' '}
                  <Text
                    fontSize="1.5vw"
                    fontWeight="regular"
                    color="#000000"
                    lineHeight="2"
                    marginLeft="1vw"
                    height="3vw"
                  >
                    {lName}{' '}
                  </Text>{' '}
                </Box>
              </VStack>
            </HStack>

            <HStack spacing="5vw">
              <VStack spacing={0} align="left">
                <Text
                  fontSize="1vw"
                  fontWeight="bold"
                  color="#000000"
                  lineHeight="2"
                  align="left"
                >
                  {' '}
                  Address/Stall Location{' '}
                </Text>
                <Box bg="#FFFFFF" borderRadius="15px" width="20vw">
                <Tooltip label={add}>
                  <Text
                    fontSize="1.5vw"
                    fontWeight="regular"
                    color="#000000"
                    lineHeight="2"
                    marginLeft="1vw"
                    height="3vw"
                    noOfLines={1}
                  >
                    {add}
                  </Text>
                  </Tooltip>
                </Box>
              </VStack>

              <VStack spacing={0} align="left">
                <Text
                  fontSize="1vw"
                  fontWeight="bold"
                  color="#000000"
                  lineHeight="2"
                  align="left"
                >
                  {' '}
                  Postal Code
                </Text>
                <Box bg="#FFFFFF" borderRadius="15px" width="10vw">
                  {' '}
                  <Text
                    fontSize="1.5vw"
                    fontWeight="regular"
                    color="#000000"
                    lineHeight="2"
                    marginLeft="1vw"
                    height="3vw"
                  >
                    {code}{' '}
                  </Text>{' '}
                </Box>
              </VStack>
            </HStack>
            
            <Box>
              <Text
                fontSize="0.75vw"
                fontWeight="semibold"
                color="#323232"
                lineHeight="1"
                align="left"
                noOfLines={2}
                marginTop="0.5vw"
                as="i"
                width="15vw"
              >
                {' '}
                Please input the location for pick-up or collection of the
                listings{' '}
              </Text>
            </Box>

            <HStack spacing="1.5vw" marginTop="0.5vw">
              <Text
                fontSize="1vw"
                fontWeight="bold"
                color="#000000"
                lineHeight="2"
                align="left"
                width="10vw"
              >
                {' '}
                Display Photo{' '}
              </Text>
              <FormControl isRequired>
                    <input
                      type="file"
                      id="myFile"
                      name="filename"
                      onChange={e => setImage(e.target.value)}
                      value={image}
                    />
                  </FormControl>
            </HStack>

            <Link to="UpdateProfile">
            <Center>
              <Box
                height="3vw"
                lineHeight="1.2"
                transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                width="35vw"
                borderRadius="15px"
                fontSize="1.5vw"
                fontWeight="semibold"
                bg="#D4A373"
                borderColor=""
                color="#FEFAE0"
                _hover={{ bg: '#AD845B' }}
                _active={{
                  bg: '#D4A373',
                  transform: 'scale(0.98)',
                  borderColor: '',
                }}
                _focus={{
                  boxShadow:
                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                }}
                as="button"
              >
                <Text
                  fontSize="1vw"
                  fontWeight="bold"
                  lineHeight="2"
                  color="#FEFAE0"
                >
                  {' '}
                  Update Profile{' '}
                </Text>
                </Box>
              </Center>
            </Link>
            </VStack>
          </Box>
        </Center>
      )}
    </div>
  );
}

export default Profile;
