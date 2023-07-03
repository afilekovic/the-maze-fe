import React, { useState } from 'react';
import './Form.css';
import { addMovie } from '../../services/dynamoService';

interface FormData{
    title: string;
    imdbLink: string;
    rating: string;
}

const initialFormData: FormData = {    
   title: '',
   imdbLink: '',
   rating: '',
};

const Form: React.FC = () => 
{

const [formData, setFormData] = useState<FormData>(initialFormData);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    addMovie(formData);  
    setFormData(initialFormData);
}



return(
    <form onSubmit={handleSubmit}>
        <div className='listStyle'>
            <label htmlFor='title'>Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}></input>
            <label htmlFor='imdbLink'>IMDB Link:</label>
            <input type="text" id="imdbLink" name="imdbLink" value={formData.imdbLink} onChange={handleChange}></input>
            <label htmlFor='rating'>Rating:</label>
            <input type="text" id="rating" name="rating" value={formData.rating} onChange={handleChange}></input>
        </div>
        <div className="submitButton">
        <button type="submit">Submit</button>
        </div>
        
    </form>
)
};
export default Form;