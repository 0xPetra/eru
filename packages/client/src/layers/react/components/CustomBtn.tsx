import React from 'react';
import { LinkBox, Button, LinkOverlay } from '@chakra-ui/react'
import { FiMusic } from "react-icons/fi";

type BtnType = {
    href: string;
    text: string;
}

const CustomBtn = ({href, text}: BtnType) => {
    return (
        <LinkBox>
            <LinkOverlay href={href}>
            <Button 
                leftIcon={<FiMusic />}
                type='submit'
                variant='solid' 
                maxW={80} 
                bgGradient="linear(to-br, #553C9A , #FF0080)"
                _hover={{
                    bgGradient: 'linear(to-r, red.500, yellow.500)',
                }}
                >
                {text}
            </Button>
            </LinkOverlay>
        </LinkBox>
    );
};

export default CustomBtn;