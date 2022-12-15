import * as React from 'react';

import { Input, FormControl, Select, HStack, Text } from '@chakra-ui/react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'

const NewSoundForm = ({formik}) => {
  return (     
    <>
    <FormControl>
        <Input 
          id='title'
          variant='unstyled' 
          placeholder='Add title' 
          onChange={formik.handleChange}
          value={formik.values.title}
          my={3}
          size='lg'
          />
      </FormControl>

      <HStack spacing='20px' justifyContent='space-around'>

        <Text mb='8px'>TYPE</Text>
        <Select 
          id='type'
          placeholder='Type' 
          size='sm'
          onChange={formik.handleChange}
          value={formik.values.type}
          >
          <option value='sound'>Sound</option>
          <option value='beat'>Beat</option>
          <option value='track'>Track</option>
          <option value='song'>Song</option>
        </Select>

        <Text mb='8px'>KEY</Text>
        <Select 
          id='key'
          placeholder='Key' 
          size='sm'
          onChange={formik.handleChange}
          value={formik.values.key}
          >
          <option value='G'>G</option>
          <option value='C'>C</option>
          <option value='F'>F</option>
        </Select>

        <Text mb='8px'>BPM</Text>
        <NumberInput size='sm' variant='outline'>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

      </HStack>
    </>
  )
}

export default NewSoundForm;