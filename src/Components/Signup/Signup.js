import react from 'react';
import { toast } from "react-toastify";
import {Button, ButtonGroup, Modal, Form} from 'react-bootstrap'
import { useState } from "react";
import './signup.css'
import UsersService from '../../Services/users.service';
function Signup(props) {
    const [prof, setProf] = useState(false)
    const [stud, setStud] = useState(false)

    const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});


	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleSubmitProf = async (e) => {
		e.preventDefault();
        try {
            console.log(data)
            const { data: res } = await UsersService.signupprof(data)
			toast.success(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				toast.error(error.response.data.message);
			}
		}
	
	};

    const handleSubmitstud = async (e) => {
        e.preventDefault();
        try {
            console.log(data)
            const { data: res } = await UsersService.signupstud(data)
			toast.success(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				toast.error(error.response.data.message);
			}
		}
        
    }
   
    return (
        <div className='navbarContainer' style={{height: '100vh'}}>
        <div className='navbarBackground' style={{height: '100vh'}}>
        <ButtonGroup aria-label="Basic example" className='grpButton'>
            <Button variant="secondary" className='grpButtonItem' onClick={() => setProf(true)}>Enseignant</Button>
            <div className='vr'></div>
            <Button variant="secondary" className='grpButtonItem' onClick={() => setStud(true)}>Etudiant</Button>  
        </ButtonGroup>
        <Modal
                {...props}
                 size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={prof}
                onHide={() => setProf(false)}
                >
                <Modal.Header >
                            <Modal.Title id="example-custom-modal-styling-title" style={{fontSize: '30px'}}>
                                Enseignant
                            </Modal.Title> 
                </Modal.Header>
                <Modal.Body>
            
                    <Form onSubmit={handleSubmitProf}>
                        
                        <Form.Group className="mb-3">
                            <Form.Label >Nom:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nom"
                                autoFocus
                                name ='lastName'
                                onChange={handleChange}
                                value={data.lastName}
                                required
                            />
                        </Form.Group>
                        <Form.Group
                        className="mb-3">
                            <Form.Label>Prenom</Form.Label>
                            <Form.Control type="text" placeholder="prenom" name='firstName' onChange={handleChange} value={data.firstName} required/> 
                        </Form.Group>
                        <Form.Group
                        className="mb-3">
                            <Form.Label>Email : </Form.Label>
                            <Form.Control type="text" placeholder="Email" name='email' onChange={handleChange} value={data.email} required/> 
                        </Form.Group>
                        <Form.Group
                        className="mb-3">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Mot de passe" name='password' onChange={handleChange} value={data.password} required/> 
                        </Form.Group>
                        
                        <Modal.Footer>
                            <button type ='submit' className='mbutton' style={{marginRight: '35vh'}}>S'inscir</button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body> 
            </Modal>
            
            <Modal
                {...props}
                 size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={stud}
                onHide={() => setStud(false)}
                >
                <Modal.Header >
                            <Modal.Title id="example-custom-modal-styling-title" style={{fontSize: '30px'}}>
                                Etudiant
                            </Modal.Title> 
                </Modal.Header>
                <Modal.Body>
            
                    <Form onSubmit={handleSubmitstud}>
                        
                    <Form.Group className="mb-3">
                            <Form.Label >Nom:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nom"
                                autoFocus
                                name ='lastName'
                                onChange={handleChange}
                                value={data.lastName}
                                required
                            />
                        </Form.Group>
                        <Form.Group
                        className="mb-3">
                            <Form.Label>Prenom</Form.Label>
                            <Form.Control type="text" placeholder="prenom" name='firstName' onChange={handleChange} value={data.firstName} required/> 
                        </Form.Group>
                        <Form.Group
                        className="mb-3">
                            <Form.Label>Email : </Form.Label>
                            <Form.Control type="text" placeholder="Email" name='email' onChange={handleChange} value={data.email} required/> 
                        </Form.Group>
                        <Form.Group
                        className="mb-3">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Mot de passe" name='password' onChange={handleChange} value={data.password} required/> 
                        </Form.Group>
                        
                        <Modal.Footer>
                            <button type ='submit' className='mbutton' style={{marginRight: '35vh'}}>S'inscir</button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body> 
            </Modal>
        
        </div>
        </div>
    )
}

export default Signup