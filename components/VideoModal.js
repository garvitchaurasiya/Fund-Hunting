// import React, { useEffect } from 'react'
// import { Button, Header, Modal } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css'
// import styles from '../styles/VideoModal.module.css'

// export default function VideoModal() {
//     // const [open, setOpen] = React.useState(false)
//     useEffect(() => {
        
//         document.getElementById("modal").click();

//     }, [])

//     return (
//         <>
//             <Modal
//                 className={styles.container}
//                 // onClose={() => setOpen(false)}
//                 // onOpen={() => setOpen(true)}
//                 // open={open}
//                 trigger={<Button id="modal">Show Modal</Button>}
//             >
//                 <Modal.Content className={styles.content} image style={{ "padding": "0", 'height': '100%' }}>
//                     {/* <Image size='medium' src='/images/avatar/large/rachel.png' wrapped /> */}
//                     <video className={styles.video} src={"/uploads/1655552862088_WhatsApp.mp4"} controls width=""></video>
//                     <Modal.Description>
//                         <Header>Default Profile Image</Header>
//                         <p>
//                             We've found the following gravatar image associated with your e-mail
//                             address.
//                         </p>
//                         <p>Is it okay to use this photo?</p>
//                     </Modal.Description>
//                 </Modal.Content>
//                 {/* <Modal.Actions>
//                     <Button color='black' onClick={() => setOpen(false)}>
//                         Nope
//                     </Button>
//                     <Button
//                         content="Yep, that's me"
//                         labelPosition='right'
//                         icon='checkmark'
//                         onClick={() => setOpen(false)}
//                         positive
//                     />
//                 </Modal.Actions> */}
//             </Modal>
//         </>
//     )
// }
