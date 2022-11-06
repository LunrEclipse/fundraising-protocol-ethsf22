import {
  Box, Button, extendTheme, Flex, FormControl,
  FormLabel, Input, Text, Textarea, useToast, ChakraProvider, useFocusEffect, Heading
} from '@chakra-ui/react';
import React, {useState, useEffect} from 'react';

export default function About() {
  const colors = {
  brand: {
    black: '#151514',
    lightyellow: '#FEFDF9',
    white: '#FFFFFF',
    green: '#E6FC9C',
    purple:'8E84EF',

  },
}
const styles = {
  global: (props) => ({
    body:{
      bg: "brand.lightyellow",
      color: "brand.black",
    },
  })
}
const theme = extendTheme({ colors, styles})
    return(
      <ChakraProvider theme={theme}>
        <>
        <Flex
            direction='column'
            pt='2rem'>
            <Heading>
                What is ProjectName?
            </Heading>
            <Text>
                ProjectName is revolutionizing the way people interact with each other. 
            </Text>
        </Flex>
        </>
      </ChakraProvider>
    );
  }