<?php
    include 'hw_1config.php';
    //DISTRUGGO sessione esistente
    session_start();
    session_destroy();


    header('Location: hw1.php');
?>