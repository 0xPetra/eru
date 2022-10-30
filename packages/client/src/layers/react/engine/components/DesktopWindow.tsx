import React, {useCallback} from 'react'
import { observer } from "mobx-react-lite";
import styles from './stylesDesktop.module.css'
import { Box, Text } from '@chakra-ui/react'
import {useDropzone} from 'react-dropzone'
import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'
import { Web3Button, useAccount } from '@web3modal/react'
import {utils} from "ethers";
import crypto from "crypto";

const from = "0x8ba1f109551bD432803012645Ac136ddd64DBA72";
const initCode = "0x6394198df16000526103ff60206004601c335afa6040516060f3";

export const DesktopWindow: React.FC = observer(({layers}) => {
  const { account } = useAccount();

  const shortenAddress = (address) => {
    return `${address.slice(0, 4)}...${address.slice(
      address.length - 4,
      address.length
    )}`;
  }

  const NFT_API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdlNjM4Q0YwNzJBYjBDNzBCODJkZjFlMTRiNjMwRjQxRWY1M0IwMDQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NzA3MTkyNTk5OSwibmFtZSI6IkV0aExpc2JvbiJ9.3ZOyJgNKgrP_NdRYbFr-9W6dHCe7EqhR72kiKq7497Q';
  const client = new NFTStorage({ token: NFT_API_TOKEN })

  // Construct with token and endpoint
  console.log("🚀 ~ process?.WEB3_API_TOKEN", process?.env.NFT_API_TOKEN)
  
  const DropZone = () => {
    const onDrop = useCallback(async acceptedFiles => {
      console.log("🚀 ~ acceptedFiles", acceptedFiles)

      const metadata = await client.store({
        name: 'Beat',
        description: 'Metadata!',
        image: acceptedFiles[0]
      })
      const id = crypto.randomBytes(32).toString('hex');
      const pk = "0x"+id;
      const entitiId = utils.computeAddress(pk);
      console.log("🚀 ~ file: DesktopWindow.tsx ~ line 44 ~ onDrop ~ entitiId, metadata.ipnft", entitiId, metadata.ipnft)
      layers.network.api.uploadSound(entitiId, metadata.ipnft)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} /> 
      
      <div className={styles.dropzone}>
      {
        isDragActive ?
          <p style={{color: 'white'}}>Drop the music files here ...</p> :
          <p style={{color: 'white'}}>Drag 'n' drop some music files here</p>
        }
    </div>
    </div>
  )
}

return (
    <div className={styles.desktop}>
        <div style={{height: "10vh"}}>
          {account?.isConnected ? <Box
          borderRadius='3xl'
          p='5'
          bg='#C527DF'
          textAlign='center'
          flex={1}
          >
          {account?.ens && (
            <Text style={{color: 'white'}} fontSize='xs'>{account?.ens}</Text>
            )}
          <Text fontSize='xs' title={account.address} style={{color: 'white'}}>{shortenAddress(account.address)}</Text>
        </Box> : <Web3Button />}
        </div>    
        <div className={styles.content}>
        <img src="/img/eruwhite.png" />
        <h1 style={{color: 'white'}}>Upload Beats</h1>
        <DropZone />
        <h3 style={{color: 'white'}}>Use mobile for remixing</h3>
        {/* TODO: Copy link to share */}
        {/* <a>Copy</a> */}
      </div>
    </div>
  )
});