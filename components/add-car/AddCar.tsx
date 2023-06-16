'use client';

import React, { useState } from 'react';
import { useVehiclesStore } from '@/common/store/store';
import { observer } from 'mobx-react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function AddCar() {
  const vehiclesStore = useVehiclesStore();
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [hp, setHp] = useState<number | null>(null);
  const [fuel, setFuel] = useState<string>();
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
      setError(false);
      setSuccess(true);
      setSuccessMessage('URL is good');
    } else {
      setError(true);
      setSuccess(false);
      setErrorMessage('There is something wrong with this URL. It should be jpg, jpeg or png');
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

  const checkHorsePower = (value: string) => {
    const regex = /^[0-9\b]+$/;

    if (regex.test(value)) {
      setHp(+value);
    } else {
      setHp(null);
    }
  };

  const sendData = () => {
    if (brand && model && price && fuel && hp && image1 && image2 && image3 && image4) {
      const dataOfNewCar = {
        name: brand,
        model,
        price,
        fuel,
        hp,
        image: [image1, image2, image3, image4],
      };
      vehiclesStore
        .addNewCar(dataOfNewCar)
        .then(() => {
          setSuccessMessage('You have successfully added a vehicle');
          setSuccess(true);
          setError(false);
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
      setErrorMessage('You must fill in all fields');
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        ADD CAR
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {error && (
          <Alert variant="filled" severity="error">
            {errorMessage}
          </Alert>
        )}
        {success && (
          <Alert variant="filled" severity="success">
            {successMessage}
          </Alert>
        )}
        <DialogTitle>Add new car on list</DialogTitle>
        <DialogContent>
          <TextField required margin="dense" label="Brand" fullWidth variant="standard" value={brand} onChange={(e) => setBrand(e.target.value)} />
          <TextField required margin="dense" label="Model" fullWidth variant="standard" value={model} onChange={(e) => setModel(e.target.value)} />
          <TextField
            required
            margin="dense"
            label="Price"
            fullWidth
            variant="standard"
            value={typeof price === 'number' ? price : ''}
            onChange={(e) => checkPrice(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            label="Horse Power"
            fullWidth
            variant="standard"
            value={typeof hp === 'number' ? hp : ''}
            onChange={(e) => checkHorsePower(e.target.value)}
          />
          <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group" onChange={(e) => setFuel(e.target.value)}>
            <FormControlLabel value="diesel" control={<Radio />} label="diesel" />
            <FormControlLabel value="gasoline" control={<Radio />} label="gasoline" />
            <FormControlLabel value="hybrid" control={<Radio />} label="hybrid" />
          </RadioGroup>
          <TextField
            required
            margin="dense"
            id="image1"
            label="Image 1"
            fullWidth
            variant="standard"
            value={image1}
            onChange={(e) => checkImageValue(e, setImage1)}
          />
          <TextField
            required
            margin="dense"
            id="image2"
            label="Image 2"
            fullWidth
            variant="standard"
            value={image2}
            onChange={(e) => checkImageValue(e, setImage2)}
          />
          <TextField
            required
            margin="dense"
            id="image3"
            label="Image 3"
            fullWidth
            variant="standard"
            value={image3}
            onChange={(e) => checkImageValue(e, setImage3)}
          />
          <TextField
            required
            margin="dense"
            id="image4"
            label="Image 4"
            fullWidth
            variant="standard"
            value={image4}
            onChange={(e) => checkImageValue(e, setImage4)}
          />
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
