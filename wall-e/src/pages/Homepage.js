import TopBar from '../components/TopBar';
import { useAuthContext } from '../hooks/useAuthContext';

import { useCollectionV2 } from '../hooks/useCollectionV2';
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
import { useState } from 'react';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from 'firebase/storage';

function Homepage() {
  const { user } = useAuthContext();
  const [tempurl, setTempURL] = useState('');

  const { documents: listings } = useCollectionV2('listings');

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
      <Box>
      <VStack spacing="3vw">
        {listings &&
          listings.map((x, index) => (
              <Box
                borderRadius="15px"
                bg="#FAEDCD"
                padding="3% 6%"
                textAlign="center"
                marginTop="2vw"
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

                </VStack>
              </Box>
          ))}
      </VStack>
      </Box>
    </div>
  );
}

export default Homepage;
