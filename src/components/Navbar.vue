<script setup>
</script>

<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <RouterLink class="navbar-brand" to="/"><img src="https://via.placeholder.com/150x50" alt="Logo"></RouterLink>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/crewlist">Crew List</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/crewdocument">Crew Document</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Library
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <RouterLink class="dropdown-item" to="/document">Document</RouterLink>
              <RouterLink class="dropdown-item" to="/rank">Rank</RouterLink>
              <RouterLink class="dropdown-item" to="/usertype">User Type</RouterLink>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
.navbar-brand img {
  height: 40px;
}
.navbar-nav .nav-link {
  padding: .5rem 1rem;
}
.navbar-nav .nav-item.dropdown:hover > .dropdown-menu {
  display: block;
}
.dropdown-menu {
  background-color: #007bff;
  border: none;
  border-radius: 0;
}
.dropdown-item {
  color: #fff;
}
.dropdown-item:hover {
  background-color: #0056b3;
}
</style>