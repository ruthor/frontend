<template>
  <div class="container">
    <div class="login-form">
      <h2>Login</h2>
      <form>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Enter Username" required="required" maxlength="10">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Enter Password" required="required" maxlength="20">
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
<style>
  body {
      background-color: #f8f9fa;
    }
    .login-form {
      max-width: 360px;
      margin: 0 auto;
      padding: 30px 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.1);
    }
    .login-form h2 {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }
    .login-form input[type="text"],
    .login-form input[type="password"] {
      border: none;
      border-bottom: 1px solid #ddd;
      border-radius: 0;
      padding: 10px 0;
      margin-bottom: 30px;
      box-shadow: none;
    }
    .login-form input[type="text"]:focus,
    .login-form input[type="password"]:focus {
      border-color: #007bff;
      box-shadow: none;
    }
    .login-form .btn-primary {
      background-color: #007bff;
      border: none;
      border-radius: 20px;
      padding: 12px 20px;
      width: 100%;
    }
    .login-form .btn-primary:hover {
      background-color: #0056b3;
    }
  </style>
<script>
    export default{
        name : 'login'
    }
</script>