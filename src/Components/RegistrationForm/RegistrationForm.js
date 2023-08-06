import React from 'react';
import './RegistrationForm.scss';

const RegistrationForm = ({ titulo, handleSubmit, handleChange, handleStatusChange, formData, required }) => {

  return (
    <div className='container'>
      <h2>{titulo}</h2>
      <form className='container__registration' onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <label className="input-group-text">Email:</label>
          <input className="form-control" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">First Name:</label>
          <input className="form-control" type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Last Name:</label>
          <input className="form-control" type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Phone:</label>
          <input className="form-control" type="tel" id="phone" name="phone" pattern="[0-9]{4}[0-9]{4}" title="Formato requerido: 12345678" value={formData.phone || ""} onChange={handleChange} required={formData.two_fa} />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Password:</label>
          <input className="form-control" type="password" id="password" name="password" value={formData.password || ""} onChange={handleChange} required={required} />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Repeat Password:</label>
          <input className="form-control" type="password" id="repeatPassword" name="repeatPassword" value={formData.repeatPassword || ""} onChange={handleChange} required={required} />
        </div>
        <div className="form-check form-switch">
          <label className="varified">Status</label>
          <input className="form-check-input" type="checkbox" id="varified" name='varified' checked={formData.varified === true} onChange={handleStatusChange} />
        </div>
        <div className="form-check form-switch">
          <label className="two_fa">Two authentication factors</label>
          <input className="form-check-input" type="checkbox" id="two_fa" name='two_fa' checked={formData.two_fa === true} onChange={handleStatusChange} />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
