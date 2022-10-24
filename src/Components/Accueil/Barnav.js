import React, { useState, useEffect} from 'react'
import { ReactComponent as Logo } from "../../Assets/Logo/E-BOSSY.svg"
import { Nav, Navbar} from "react-bootstrap"
import { Link } from 'react-router-dom'
import './Accueil.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { logout } from '../../Redux/authSlice/index'
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import UserService from "../../Services/users.service";
import LibrairieSearch from './LibrairieSearch'
import bookService from '../../Services/book.service'
import { toast } from "react-toastify";
import {Button, Form} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

function Barnav(props) {
    const {user} = useSelector((state) => state.auth);
    const [utilisateur, setUtilisateur] = useState({})
    const [show, setShow] = useState(false);
    const [shows, setShows] = useState(false);
    const [book, setbook] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id } = useParams();
  const getUser = async (id) => {
    try {
        const { data } = await UserService.getUser(id)
        console.log(data)
        setUtilisateur(data.data);
    } catch (error) {
        console.log(error);
    }
};

useEffect( () => {
if (user) {
    getUser(user._id)
} 
}, [id]);

const dispatch = useDispatch();

    const handleLogout = () => {
      dispatch(logout());
      window.location = "/Login";
	}; 
    const handleTitleChange = event => {
        setbook({ ...book, title: event.target.value});
      }

      const handleStatusChange = event => {
        setbook({ ...book, status: event.target.value});
      }

      const handleTypeChange = event => {
        setbook({ ...book, type: event.target.value});
      }

    const handleFileChange = event => {
        setbook({ ...book, file: event.target.files});
      }


      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', book.title);
        data.append('status', book.status);
        data.append('type', book.type);
        
        for (const key of Object.keys(book.file)) {
            data.append('book', book.file[key])
        }
        console.log(data)
        await bookService.uploadBook(user._id, data)
        .then(res => {
           // console.log(res);
           // console.log(res.data);
           // console.log("Sent successfuly")
            toast.success(res.data.message);
        })
        .catch ((error) => {
            if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				toast.error(error.response.data.message);
			}
        })
        
    }

    return(
                <>
                       {!user && (
                        <Navbar>
                        <Navbar.Brand> <Logo className="logo"></Logo></Navbar.Brand>
                            <Nav className="navbarelement">
                            <Nav.Link> <Link to= '/login' className='navbarItem'> Se connecter <FontAwesomeIcon icon={faUser} style={{marginLeft: '1vh'}}/> </Link> </Nav.Link>
                            <div className="vr" style={{color: 'white', width:'1px', opacity:'100%', height:'5vh', marginLeft: '1vh'}}></div>      
                           
                                <FontAwesomeIcon onClick={handleShow} icon={faBars} className= 'bar' />
                                <Offcanvas show={show} onHide={handleClose} placement='end'>
                                    <Offcanvas.Header closeButton>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Nav.Link ><Link to = '/' className='sidebarItem' >Accueil</Link></Nav.Link>
                                        <Nav.Link ><Link to = '/login' className='sidebarItem' >Log in</Link></Nav.Link>
                                        <Nav.Link ><Link to = '/signUp' className='sidebarItem' >Sign Up</Link></Nav.Link>
                                    </Offcanvas.Body>
                                </Offcanvas>
                        </Nav>
                        </Navbar>
                       )}   
                       {user && (
                        <>
                        <Navbar>
                        <Navbar.Brand> <Logo className="logo"></Logo></Navbar.Brand>
                        <Nav className="navbarelement">
                            <Nav.Link> <Link to ='/profil' className='navbarItem'> {utilisateur.firstName} {utilisateur.lastName} <FontAwesomeIcon icon={faUser} style={{marginLeft: '1vh'}}/> </Link> </Nav.Link>
                            <div className="vr" style={{color: 'white', width:'1px', opacity:'100%', height:'5vh', marginLeft: '1vh'}}></div>      
                           
                                <FontAwesomeIcon onClick={handleShow} icon={faBars} className= 'bar' />
                                <Offcanvas show={show} onHide={handleClose} placement='end'style={{width: '70vh'}}>
                                    <Offcanvas.Header closeButton>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Nav.Link ><Link to = '/dashboard' className='sidebarItem' >Accueil</Link></Nav.Link>
                                        <Nav.Link ><Link to = '/cours' className='sidebarItem' >Cours</Link></Nav.Link>
                                        <Nav.Link ><Link to = '/profil' className='sidebarItem' >Profile</Link></Nav.Link>
                                        <Nav.Link ><Link onClick={handleLogout} className='sidebarItem' >Logout</Link></Nav.Link>
                                    </Offcanvas.Body>
                                </Offcanvas>
                        </Nav>
                        </Navbar>
                        <LibrairieSearch/>
                        <button className="vmbutton" style={{marginLeft: '86vh', marginTop: '5vh'}} onClick={() => setShows(true)}> ajouter nouveau livre </button>
                        <Modal
                {...props}
                 size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={shows}
                onHide={() => setShows(false)}
                >
                <Modal.Header >
                            <Modal.Title id="example-custom-modal-styling-title" className="jobtitle">
                                Nouveau livre
                            </Modal.Title> 
                </Modal.Header>
                <Modal.Body>
            
                        <Form onSubmit={handleSubmit}>
                            
                            <Form.Group className="mb-3">
                                <Form.Label >Nom du livre:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Tapez ici le nom du livre"
                                    autoFocus
                                    name ='title'
                                    onChange={handleTitleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label >Status:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Privée/Public"
                                    autoFocus
                                    name ='status'
                                    onChange={handleStatusChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label >Type:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Type"
                                    autoFocus
                                    name ='type'
                                    onChange={handleTypeChange}
                                    required
                                />
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                            <Form.Label>Livre (pdf):</Form.Label>
                            <Form.Control type='file' name='file' onChange={handleFileChange} multiple required accept="application/pdf"/>
                            </Form.Group>
                            
                            <Modal.Footer>
                                <Button type ='submit' className='smbutton2'>Envoyer</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body> 
                </Modal>
                        </>
                       )}   
           </>
    
    )
}

export default Barnav