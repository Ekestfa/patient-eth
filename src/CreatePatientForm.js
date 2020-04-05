import React from 'react';
import './App.scss';


function CreatePatientForm (prop) {
    return(
        <div class="col-lg-3 mt-1 mb-1">
<div class="card card-profile-signup p-1">
  <form className='formbase'>
    <div class="card-body">
      <h5 class="card-title">Create your profile</h5>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="sign-up-username" required="required"/>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="sign-up-username" required="required"/>
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="sign-up-name"/>
      </div>
      <div class="form-group">
        <label for="surname">Surname</label>
        <input type="text" class="form-control" id="sign-up-srname"/>
      </div>
      <div class="form-group">
        <label for="age">Age</label>
        <input type="text" class="form-control" id="sign-up-age"/>
      </div>
      <div class="form-group">
        <label for="sex">Sex</label>
        <input type="text" class="form-control" id="sign-up-sex"/>
      </div>
      <div class="form-group">
        <label for="id">Identity No.</label>
        <input type="text" class="form-control" id="sign-up-idno"/>
      </div>
      <div class="form-group">
        <label for="ins">Insurance No.</label>
        <input type="text" class="form-control" id="sign-up-insno"/>
      </div>
      {/* <div class="form-group">
        <label for="username">Short intro</label>
        <textarea class="form-control" id="sign-up-intro" rows="2"></textarea>
      </div> */}
      <p>ETH Address:
        <span class="eth-address"></span>
        <input type="text" class="form-control" id="sign-up-eth-address" value={prop.value} disabled/>
      </p>
      <button type="submit" class="btn btn-primary" id="sign-up-button">Sign Up</button>
    </div>
  </form>
</div>
</div>
    );
}

export default CreatePatientForm;
