import { Text, Flex, Image, HStack } from '@chakra-ui/react'
import { useEnsName } from 'wagmi'
import { useEnsAvatar } from 'wagmi'
import shareIcon from './share.svg';
import {useEffect, useState} from 'react';
import {useAccount} from 'wagmi';
const { ethers } = require("ethers");

function ProfilePost(props) {
    const data = props.post
    const [donationAmount, setDonationAmount] = useState('');
    const {isConnected, address} = useAccount();
    const [hasShared, setHasShared] = useState(false);
    const ensName = useEnsName({
        address: data.author,
        chainId: 1,
    })
    const ensAvatar = useEnsAvatar({
        address: data.author,
        chainId: 1,
    })
    const id = props.post.id.toNumber()

    useEffect(() => {
        if (data.author === address) {
            setHasShared(true)
        }
    }, [])

    useEffect(() => {
        loadPost()
    }, [])

    const [imageURL, setImageURL] = useState("");
    const [description, setDescription] = useState("");
    const [profit, setProfit] = useState("");

    async function loadPost() {
        let link = "https://" + props.post.ipfsLink;
        let response = await fetch(link);
        let data = await response.json();
        let imageLink = "https://" + data.loc;
        let amount = data.amountReceived ? ethers.utils.formatEther(data.amountReceived) : "0";
        setProfit(amount);
        setImageURL(imageLink);
        setDescription(data.description);
    }

    return (
        <Flex
            border = "solid"
            borderRadius={"25"}
            direction={'column'}
            justifyContent = 'space-around'
            padding={20}
            spacing = {10}
            bg='white'
            zIndex = "2">
            
            <Image 
                src={imageURL}
                width="600px"
                height="600px"
            />
            <HStack
                justify="space-between">
                <Flex
                    align={'center'}
                    justify = {'left'}>
                    <Text
                        fontSize = "sm"
                        fontWeight={'bold'}
                        marginRight = '4px'
                        >
                            {data.backers.length}
                    </Text>
                    <Image
                        src = {shareIcon}
                        height = "20px"
                        color='gray.900'>
                        
                    </Image>
                </Flex>
                <Text
                        fontSize = "sm"
                        fontWeight={'bold'}
                        marginRight = '4px'
                        >
                            {profit} ETH
                </Text>
            </HStack>
            <Text
                marginTop={'-5px'}
                fontSize = "md"
                width = "600px"
                >
                    {description}
            </Text>
        </Flex>
    );
    }
export default ProfilePost;