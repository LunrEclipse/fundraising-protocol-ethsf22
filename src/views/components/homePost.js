import { Text, Flex, Image, Input, Button, InputLeftAddon, } from '@chakra-ui/react'
import { useEnsName } from 'wagmi'
import { useEnsAvatar } from 'wagmi'
import shareIcon from './share.svg';
import {useEffect, useState} from 'react';
import {useContractWrite, usePrepareContractWrite, useProvider, useAccount} from 'wagmi';
import ABI from '../../Fundraiser.json';
const { ethers } = require("ethers");

function HomePost(props) {
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

    const { config } = usePrepareContractWrite({
        address: process.env.REACT_APP_FUNDRAISER_ADDRESS,
        abi: ABI.abi,
        functionName: "sharePost",
        args: [id],
        overrides: {
            value: ethers.utils.parseEther('0.01'),
        }
      })
    const { data1, isLoading, isSuccess, write } = useContractWrite(config)

    useEffect(() => {
        loadPost()
    }, [])

    const [imageURL, setImageURL] = useState("");
    const [description, setDescription] = useState("");

    async function loadPost() {
        let link = "https://" + props.post.ipfsLink;
        let response = await fetch(link);
        let data = await response.json();
        let imageLink = "https://" + data.loc;
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
            <Flex
                align={'center'}
                justify = {'left'}
                marginBottom = {'10'}>
                <Image
                    borderRadius="full"
                    boxSize="25px"
                    src={ensAvatar.data}
                    fallbackSrc="https://464911102-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/collections%2F2TjMAeHSzwlQgcOdL48E%2Ficon%2FKWP0gk2C6bdRPliWIA6o%2Fens%20transparent%20background.png?alt=media&token=bd28b063-5a75-4971-890c-97becea09076"
                />
                <Text
                paddingLeft={'5px'}
                fontSize = "sm"
                sx={{
                    textAlign:'center',
                }}
                >
                    {ensName.data}
                </Text>
            </Flex>
            <Image 
                src={imageURL}
                width="600px"
                height="600px"
            />
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
                marginTop={'-5px'}
                fontSize = "md"
                width = "600px"
                >
                    {description}
            </Text>
            <Flex
                align={'center'}
                paddingTop = {'10px'}
                justify = {'right'}>
                <Input
                    width = '15rem'
                    height = '30px'
                    placeholder='0.00062'
                    borderRadius = '50px'
                    borderWidth = '1px'
                    borderColor = 'black'
                    zIndex = {2}
                    borderStyle={'solid'}
                    pl='1rem'
                    onChange = {
                        (e) => {
                            setDonationAmount(e.target.value);
                        }
                    }>
                </Input>
                <Button
                    position = {'absolute'}
                    height = '35px'
                    width = '6rem'
                    borderRadius = '50px'
                    borderWidth = '1px'
                    borderColor = 'black'
                    backgroundColor = '#E6FC9C'
                    borderStyle={'solid'}
                    cursor = 'pointer'
                    zIndex={2}
                    disabled = {hasShared}
                    onClick = {
                        () => {
                            write({
                                recklesslySetUnpreparedOverrides: {
                                    value: ethers.utils.parseEther(donationAmount),
                                },
                            })
                            setHasShared(true);
                        }
                    }>
                        <Text
                            fontSize = "sm"
                            fontWeight={'bold'}
                            pr='0.5rem'
                            pl='2rem'
                            // marginRight = '4px'
                            >
                                ETH
                        </Text>
                        <Image
                            src = {shareIcon}
                            height = "20px" pr='2rem'
                            >
                        </Image>
                </Button>
            </Flex>
            <Text
                align = {'right'}
                fontSize = "0.75rem"
                color = "gray"
                >
                    Clicking on share donates to both the poster and other sharers. <u>Learn More.</u>
            </Text>
        </Flex>
    );
    }
export default HomePost;