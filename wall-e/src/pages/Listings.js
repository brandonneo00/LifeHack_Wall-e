import TopBar from '../components/TopBar';
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Divider,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import { Formik, Field } from 'formik';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import { useCollection } from '../hooks/useCollection';
import logo from '../image/logo.png';

import { db } from '../firebase/config';
import { doc } from 'firebase/firestore'; // for deleting or updating documemts
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  setDoc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from 'firebase/storage';

function Listings() {
  const { user } = useAuthContext();
  const [category, setCategory] = useState('');
  const [foodName, setfoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [tempurl, setTempURL] = useState('');

  const [error, setError] = useState(null);
  const [PATH, setPATH] = useState('personal/' + user.uid + '/compiled');

  const storage = getStorage();

  //   const checkError = (answerInput, acadYear) => {
  //     if (answerInput.includes(" ")) {
  //       throw Error("Answer should be one word");
  //     }

  //     if (
  //       acadYear.includes("/") ||
  //       acadYear.includes(" ") ||
  //       !acadYear.includes("-") ||
  //       acadYear.length !== 5
  //     ) {
  //       throw Error(
  //         "Academic Year should be in the format 21-22 separated by a dash"
  //       );
  //     }
  //   };

  const handleRedeemed = async id => {
    const docRef = doc(db, 'listings', id);
    await deleteDoc(docRef);

    const secondDocRef = doc(db, 'personal', user.uid, 'compiled', id);
    setDoc(
      secondDocRef,
      {
        Redeem: true,
      },
      { merge: true }
    );
  };

  const handleDelete = async id => {
    console.log(id);

    // first argument is the database that we want to connect to
    // second argument is the specific collection
    // third arugment is the id of the document we want to reference to

    const docRef = doc(db, 'listings', id);
    await deleteDoc(docRef);

    const secondDocRef = doc(db, 'personal', user.uid, 'compiled', id);
    await deleteDoc(secondDocRef);
  };

  const uploadFile = () => {
    if (image !== null) {
      const imageRef = ref(storage, user.uid + '/' + image.name);
      uploadBytes(imageRef, image).then(() => {
        console.log('Image uploaded');
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    var today = new Date();

    console.log(today);

    try {
      //   checkError(answer, academicyear);

      //Reference to userprofiles db
      let tempAddress;
      const q = query(
        collection(db, 'userprofiles'),
        where('uid', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        tempAddress = doc.data().Address;
      });

      //First reference to initial collection
      const ref1 = collection(db, 'listings');

      const listingDoc = await addDoc(ref1, {
        Category: category.toUpperCase(),
        FoodName: foodName.toUpperCase(),
        Quantity: quantity,
        Description: description.toUpperCase(),
        Location: tempAddress,
        uid: user.uid,
        Image: image.name,
        TimeStamp: today.toString(),
      });

      console.log(listingDoc.id + ' This is listing id in listings collection');

      //Reference to second database
      const refTwo = doc(db, 'personal', user.uid, 'compiled', listingDoc.id);

      setDoc(refTwo, {
        Category: category.toUpperCase(),
        FoodName: foodName.toUpperCase(),
        Quantity: quantity,
        Description: description.toUpperCase(),
        Location: tempAddress,
        uid: user.uid,
        Image: image.name,
        TimeStamp: today.toString(),
        Redeem: false,
      });

      setPATH('personal/' + user.uid + '/compiled');

      // if (image !== null) {
      //   const imageRef = ref(storage, user.uid + "/" + image.name);
      //   uploadBytes(imageRef, image).then(() => {
      //     console.log("Image uploaded")
      //   });
      // }

      setCategory('');
      setfoodName('');
      setQuantity('');
      setDescription('');
      setImage(null);
    } catch (e) {
      setError(e);
      console.error(e);
    }
  };

  const { documents: listings } = useCollection('listings', [
    'uid',
    '==',
    user.uid,
  ]);

  const { documents: personal } = useCollection(PATH, ['uid', '==', user.uid]);

  const theURL = filename => {
    const storage = getStorage();

    // Create a reference under which you want to list
    const listRef = ref(storage, user.uid + '/' + filename);

    getDownloadURL(listRef).then(url => {
      setTempURL(url);
      console.log(url + 'link');
    });

    console.log('this is tempurl ' + tempurl);
    return tempurl;
  };

  return (
    <div>
      <TopBar />
      <Box padding="3% 10%">
        <Box borderRadius="15px" bg="#FAEDCD" padding="3% 5%">
          <Formik>
            <form onSubmit={handleSubmit}>
              <VStack spacing="1vw" align="flex">
                <HStack spacing="2vw">
                  <Box width="20vw">
                    <Text
                      fontSize="1.5vw"
                      fontWeight="bold"
                      color="#000000"
                      lineHeight="2"
                      align="left"
                    >
                      Category
                    </Text>
                  </Box>
                  <FormControl isRequired>
                    <Select
                      variant="filled"
                      placeholder="Choose a Catogory"
                      onChange={e => setCategory(e.target.value)}
                      value={category}
                      height="4vw"
                      fontSize="1.5vw"
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
                  </FormControl>
                </HStack>
                <HStack spacing="2vw">
                  <Box width="20vw">
                    <Text
                      fontSize="1.5vw"
                      fontWeight="bold"
                      color="#000000"
                      lineHeight="2"
                      align="left"
                    >
                      Food/Product Name
                    </Text>
                  </Box>
                  <FormControl isRequired>
                    <Field
                      as={Input}
                      id="foodName"
                      name="foodName"
                      variant="filled"
                      placeholder="E.g. Chicken Rice / Baked Beans"
                      onChange={e => setfoodName(e.target.value)}
                      borderRadius="15px"
                      height="4vw"
                      value={foodName}
                      fontSize="1.5vw"
                    />
                  </FormControl>
                </HStack>
                <HStack spacing="2vw">
                  <Box width="20vw">
                    <Text
                      fontSize="1.5vw"
                      fontWeight="bold"
                      color="#000000"
                      lineHeight="2"
                      align="left"
                    >
                      Quantity
                    </Text>
                  </Box>
                  <FormControl isRequired>
                    <NumberInput min={0} variant="filled">
                      <NumberInputField
                        fontSize="1.5vw"
                        height="4vw"
                        onChange={e => setQuantity(e.target.value)}
                        borderRadius="15px"
                        value={quantity}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </HStack>
                <HStack spacing="2vw">
                  <Box width="20vw">
                    <Text
                      fontSize="1.5vw"
                      fontWeight="bold"
                      color="#000000"
                      lineHeight="2"
                      align="left"
                    >
                      Description
                    </Text>
                  </Box>
                  <FormControl isRequired>
                    <Field
                      as={Textarea}
                      id="description"
                      name="description"
                      variant="filled"
                      placeholder="E.g. Left-over Chicken Rice for collection (before 10pm). Please approach store owner for more details."
                      onChange={e => setDescription(e.target.value)}
                      borderRadius="15px"
                      height="4vw"
                      value={description}
                      fontSize="1.5vw"
                    />
                  </FormControl>
                </HStack>
                <HStack spacing="2vw">
                  <Box width="20vw">
                    <Text
                      fontSize="1.5vw"
                      fontWeight="bold"
                      color="#000000"
                      lineHeight="2"
                      align="left"
                    >
                      Image
                    </Text>
                  </Box>
                  <FormControl isRequired>
                    <input
                      type="file"
                      id="myFile"
                      name="filename"
                      onChange={e => {
                        setImage(e.target.files[0]);
                      }}
                    />
                  </FormControl>
                </HStack>
                <Text
                  fontSize="1.2vw"
                  fontWeight="semibold"
                  color="red"
                  lineHeight="2"
                  align="left"
                  as="i"
                >
                  *For pick-up/collection location, we will use the same address
                  saved under profile
                </Text>
                <Box textAlign="right">
                  <Box
                    height="4vw"
                    lineHeight="1.2"
                    transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                    border="0px"
                    width="24vw"
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
                    onClick={uploadFile}
                  >
                    Create Listing
                  </Box>
                </Box>
              </VStack>
            </form>
          </Formik>
        </Box>
        <Box
          height="2vw"
          border="2px"
          borderColor="#ffffff"
          borderBottomColor="#B5B5B5"
          marginBottom="2vw"
        />
        <Box overflowY="scroll" height="50vw" maxHeight="60vw">
          <Center>
            <VStack>
              {personal &&
                personal.map((x, index) => (
                  <HStack
                    align="flex"
                    spacing="5vw"
                    padding="3% 3% 3% 1%"
                    key={index}
                  >
                    <Box
                      borderRadius="15px"
                      bg="#FAEDCD"
                      padding="5% 10%"
                      textAlign="center"
                    >
                      <VStack spacing="0">
                        <Box width="25vw">
                          <Image src={theURL(x.Image)} />
                        </Box>
                        <Text
                          fontSize="1.2vw"
                          fontWeight="bold"
                          color="black"
                          lineHeight="2"
                          align="left"
                          width="25vw"
                        >
                          Category
                        </Text>

                        <Text
                          fontSize="1vw"
                          fontWeight="regular"
                          color="black"
                          lineHeight="1.5"
                          align="left"
                          width="25vw"
                        >
                          {x.Category}
                        </Text>

                        <Text
                          fontSize="1.2vw"
                          fontWeight="bold"
                          color="black"
                          lineHeight="2"
                          align="left"
                          width="25vw"
                        >
                          Food/Product Name
                        </Text>

                        <Text
                          fontSize="1vw"
                          fontWeight="regular"
                          color="black"
                          lineHeight="1.5"
                          align="left"
                          width="25vw"
                        >
                          {x.FoodName}
                        </Text>

                        <Text
                          fontSize="1.2vw"
                          fontWeight="bold"
                          color="black"
                          lineHeight="2"
                          align="left"
                          width="25vw"
                        >
                          Quantity
                        </Text>

                        <Text
                          fontSize="1vw"
                          fontWeight="regular"
                          color="black"
                          lineHeight="1.5"
                          align="left"
                          width="25vw"
                        >
                          {x.Quantity}
                        </Text>

                        <Text
                          fontSize="1.2vw"
                          fontWeight="bold"
                          color="black"
                          lineHeight="2"
                          align="left"
                          width="25vw"
                        >
                          Description
                        </Text>

                        <Text
                          fontSize="1vw"
                          fontWeight="regular"
                          color="black"
                          lineHeight="1.5"
                          align="left"
                          width="25vw"
                        >
                          {x.Description}
                        </Text>

                        <Text
                          fontSize="1.2vw"
                          fontWeight="bold"
                          color="black"
                          lineHeight="2"
                          align="left"
                          width="25vw"
                        >
                          Location
                        </Text>

                        <Text
                          fontSize="1vw"
                          fontWeight="regular"
                          color="black"
                          lineHeight="1.5"
                          align="left"
                          width="25vw"
                        >
                          {x.Location}
                        </Text>

                        <Text
                          fontSize="1vw"
                          fontWeight="regular"
                          color="grey"
                          lineHeight="1.5"
                          align="left"
                          width="25vw"
                        >
                          Posted on {x.TimeStamp}
                        </Text>

                        {x.Redeem && (
                          <>
                            <Text
                              fontSize="1.2vw"
                              fontWeight="bold"
                              color="#92CF7D"
                              lineHeight="2"
                              align="left"
                              width="25vw"
                            >
                              Fully Redeemed!!!
                            </Text>
                          </>
                        )}
                      </VStack>
                    </Box>
                    <Center>
                      <VStack spacing="3vw">
                        <Button
                          height="4vw"
                          lineHeight="1.2"
                          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                          border="0px"
                          width="15vw"
                          borderRadius="15px"
                          fontSize="1.5vw"
                          fontWeight="semibold"
                          bg="#92CF7D"
                          borderColor=""
                          color="#000000"
                          _hover={{ bg: '#669556' }}
                          _active={{
                            bg: '#92CF7D',
                            transform: 'scale(0.98)',
                            borderColor: '',
                          }}
                          _focus={{
                            boxShadow:
                              '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                          }}
                          as="button"
                          onClick={() => handleRedeemed(x.id)}
                          isDisabled={x.Redeem}
                        >
                          Fully Redeemed
                        </Button>

                        <Box
                          height="4vw"
                          lineHeight="1.2"
                          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                          border="0px"
                          width="15vw"
                          borderRadius="15px"
                          fontSize="1.5vw"
                          fontWeight="semibold"
                          bg="red"
                          borderColor=""
                          color="#000000"
                          _hover={{ bg: '#CE1F14' }}
                          _active={{
                            bg: 'red',
                            transform: 'scale(0.98)',
                            borderColor: '',
                          }}
                          _focus={{
                            boxShadow:
                              '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                          }}
                          as="button"
                          onClick={() => handleDelete(x.id)}
                        >
                          Delete
                        </Box>
                      </VStack>
                    </Center>
                  </HStack>
                ))}
            </VStack>
          </Center>
        </Box>
      </Box>
    </div>
  );
}

export default Listings;
