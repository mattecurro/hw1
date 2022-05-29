<?php
    require_once 'hw1_config.php';
    //CONNESSIONE al DB
    $conn = connetti();


    /*
    echo $_SESSION["username"];
    echo $_SESSION["id"];
*/


    if(isset($_SESSION["username"]))
    {
        $utente_id = mysqli_real_escape_string($conn, $_SESSION["id"]);
        $voto = mysqli_real_escape_string($conn, $_GET["voto"]);
    
        $query = "INSERT INTO partecipanti(utente, voto) VALUES(\"$utente_id\", \"$voto\")";

        mysqli_query($conn, $query);

    }
    
    else{
    $utente = mysqli_real_escape_string($conn, $_GET["username"]);
    
    $query = "INSERT INTO utenti(username) VALUES(\"$utente\")";  

    mysqli_query($conn, $query);

    $utente_id = mysqli_insert_id($conn);  
    }



    echo $utente_id;

    setcookie("username", $utente);
    setcookie("utente_id", $utente_id);

    
    mysqli_close($conn);

    $id_sondaggio = $_GET["id_sondaggio"];

    header("Location: hw1_vote_pool.php?id_sondaggio=".$id_sondaggio);
    exit;
?>
