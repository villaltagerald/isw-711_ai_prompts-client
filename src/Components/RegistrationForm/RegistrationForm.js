import React from 'react';
import './RegistrationForm.scss';

const RegistrationForm = ({ titulo, handleSubmit, handleChange, handleStatusChange, formData, required }) => {

  return (
    <div className='container'>
      <h2>{titulo}</h2>
      <form className='container__registration' onSubmit={handleSubmit}>
        <div className="container__registration__group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="container__registration__group">
          <label htmlFor="first_name">First Name:</label>
          <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div className="container__registration__group">
          <label htmlFor="last_name">Last Name:</label>
          <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>
        <div className="container__registration__group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required={required} />
        </div>
        <div className="container__registration__group">
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input type="password" id="repeatPassword" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} required={required} />
        </div>
        <div className="registration__box__status">
          <label htmlFor="statusCheckbox">Status:</label>
          <input type="checkbox" id="statusCheckbox" checked={formData.varified === true} onChange={handleStatusChange} />
          {formData.varified === true ? 'Active' : 'Pending'}
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
