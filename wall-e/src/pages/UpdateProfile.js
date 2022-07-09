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
  Button,
  HStack,
  Select,
} from '@chakra-ui/react';
import React from 'react';
import { Formik, Field } from 'formik';
import { useState } from 'react';

import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

// specific for UID of users
import { useAuthContext } from "../hooks/useAuthContext";

import { useHistory } from "react-router-dom";

function UpdateProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [accountType, setAccountType] = useState('');

  const { user } = useAuthContext();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ref = collection(db, "userprofiles");

    await addDoc(ref, {
      FirstName: firstName,
      LastName: lastName,
      Address: address,
      PostalCode: postalCode,
      AccountType: accountType,
      TwoDigit: postalCode.substring(0,2), 
      uid: user.uid
    });

    setFirstName("");
    setLastName("");
    setAddress("");
    setPostalCode("");
    setAccountType("");
    setTimeout(() => history.push("/Home"), 300);
  };

  return (
    <>
      <Center height="100vh">
        <Box bg="#FAEDCD" padding="2% 4%" borderRadius="15px">
          <Text
            fontSize="2.5vw"
            fontWeight="bold"
            color="#000000"
            lineHeight="2"
            align="left"
            marginBottom="1vw"
          >
            Update Profile
          </Text>
          <Formik>
            <form onSubmit={handleSubmit}>
              <VStack spacing="1.5vw" align="flex-start">
                <HStack spacing="2vw">
                  <FormControl isRequired>
                    <Field
                      as={Input}
                      id="firstname"
                      name="firstname"
                      variant="filled"
                      placeholder="First Name"
                      onChange={e => setFirstName(e.target.value)}
                      borderRadius="15px"
                      width="22vw"
                      height="4vw"
                      value={firstName}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <Field
                      as={Input}
                      id="lastname"
                      name="lastname"
                      variant="filled"
                      placeholder="Last Name"
                      onChange={e => setLastName(e.target.value)}
                      borderRadius="15px"
                      width="14vw"
                      height="4vw"
                      value={lastName}
                    />
                  </FormControl>
                </HStack>
                <HStack spacing="2vw">
                  <FormControl isRequired>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      placeholder="Address"
                      variant="filled"
                      onChange={e => setAddress(e.target.value)}
                      borderRadius="15px"
                      height="4vw"
                      width="22vw"
                      margin="0.8vw 0vw"
                      value={address}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      placeholder="Postal Code"
                      variant="filled"
                      onChange={e => setPostalCode(e.target.value)}
                      borderRadius="15px"
                      height="4vw"
                      width="14vw"
                      margin="0.8vw 0vw"
                      value={postalCode}
                    />
                  </FormControl>
                </HStack>

                <FormControl isRequired>
                  <Select
                    variant="filled"
                    width="22vw"
                    height="4vw"
                    placeholder="Account Type"
                    value={accountType}
                    onChange={e => setAccountType(e.target.value)}
                    marginBottom="1vw"
                  >
                    <option>Stall Owner</option>
                    <option>Individual</option>
                  </Select>
                </FormControl>

                <Box
                  height="4vw"
                  lineHeight="1.2"
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                  border="0px"
                  width="38vw"
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
                  Update Profile
                </Box>
              </VStack>
            </form>
          </Formik>
        </Box>
      </Center>
    </>
  );
}

export default UpdateProfile;
