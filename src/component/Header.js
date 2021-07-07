import React,{useState} from 'react'
import '../component/Header.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
    const top = 50 
    const left = 50 

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles((theme) => ({
paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #EEEE',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow:"scroll",
    height:"60%"
},
}));

function Header({cartlen,data ,remove,deleteall,inc,dec}) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const total=()=>{
        let result = 0
        data.map((i)=>(
            result = result+i.price * i.quantity
        ))
        return( 
            result +'Rs'
        )
    }
    return (
        <div className='main_head'>
            <div className="header">
                <div className="logo">
                    <h1>Food Basket</h1>
                </div>
                <div className="cart">
                    {/* Add to cart button */}
                    <Badge badgeContent={cartlen} color="primary">
                        <button className='shopping_cart' onClick={()=>setOpen(true)}><ShoppingCartIcon /></button>
                    </Badge>
                    {/* Cart Modal Popup container */}
                    <Modal open={open}
                    onClose={()=>setOpen(false)} className='paper'
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <div className="del_all_btn">
                                <button className='delete_all' onClick={()=>deleteall()}>Delete All</button>
                                <p><strong>Total Cost:</strong> {total()}</p>
                            </div>
                            {/* Mappinng Cart data in this container */}
                            {data.map((c,index)=>(
                                <div className="cart_detail" key={index}>
                                    <img src={c.img} alt="" />
                                    <div className="detail">
                                        <h1>{c.name}</h1>
                                        <small>Price</small>
                                        <p>{c.price}Rs</p>
                                        <strong>Qty</strong>
                                        <div className="qty">
                                            <button onClick={()=>dec(c)} disabled={c.quantity===1} >-</button>
                                            <input type="text" value={c.quantity}/>
                                            <button onClick={()=>inc(c)}>+</button>
                                        </div>
                                    </div>
                                    <div className="del_btn">
                                    <button className='delete' onClick={()=>remove(c)}>X</button>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </Modal>

                    <AccountCircleIcon className='account'/>
                </div>
            </div>
        </div>
    )
}

export default Header
