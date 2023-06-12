'use client';

import React, { useState } from 'react';
import { useVehiclesStore } from '@/store/store';
import { observer } from 'mobx-react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';

function AddCar() {
  const vehiclesStore = useVehiclesStore();
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [image1, setImage1] = useState<string>('');
  const [image2, setImage2] = useState<string>('');
  const [image3, setImage3] = useState<string>('');
  const [image4, setImage4] = useState<string>('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const checkImageValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setImage: React.Dispatch<React.SetStateAction<string>>) => {
    const imageUrlRegex = /^https?:\/\/.*\.(jpeg|jpg|png)(\?.*)?$/i;
    if (imageUrlRegex.test(e.target.value)) {
      setImage(e.target.value);
    } else {
      setImage('');
    }
  };

  const checkPrice = (value: string) => {
    const regex = /^[0-9\b]+$/;

    if (regex.test(value)) {
      setPrice(+value);
    } else {
      setPrice(null);
    }
  };

  const sendData = () => {
    if (brand && model && price && image1 && image2 && image3 && image4) {
      console.log('postoje sve vrednosti');
      const dataOfNewCar = {
        name: brand,
        model,
        price,
        image: [image1, image2, image3, image4],
      };
      vehiclesStore.addNewCar(dataOfNewCar)
        .then(() => {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setOpen(false);
            vehiclesStore.getVehicles();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('ne postoje');
      setError(true);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        ADD CAR
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {error && <Alert variant="filled" severity="error">You have not filled in all the fields</Alert>}
        {success && <Alert variant="filled" severity="success">This is a success alert — check it out</Alert>}
        <DialogTitle>Add new car on list</DialogTitle>
        <DialogContent>
          <TextField required margin="dense" label="Brand" fullWidth variant="standard" value={brand} onChange={(e) => setBrand(e.target.value)} />
          <TextField required margin="dense" label="Model" fullWidth variant="standard" value={model} onChange={(e) => setModel(e.target.value)} />
          <TextField required margin="dense" label="Price" fullWidth variant="standard" value={typeof price === 'number' ? price : ''} onChange={(e) => checkPrice(e.target.value)} />
          <TextField required margin="dense" id="image1" label="Image 1" fullWidth variant="standard" value={image1} onChange={(e) => checkImageValue(e, setImage1)} />
          <TextField required margin="dense" id="image2" label="Image 2" fullWidth variant="standard" value={image2} onChange={(e) => checkImageValue(e, setImage2)} />
          <TextField required margin="dense" id="image3" label="Image 3" fullWidth variant="standard" value={image3} onChange={(e) => checkImageValue(e, setImage3)} />
          <TextField required margin="dense" id="image4" label="Image 4" fullWidth variant="standard" value={image4} onChange={(e) => checkImageValue(e, setImage4)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={sendData}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default observer(AddCar);
