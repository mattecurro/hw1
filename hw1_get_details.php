<?php
    require_once 'hw1_config.php';
    //CONNESSIONE al DB
    $conn = connetti();
    
    $id_sondaggio = $_GET["id_sondaggio"];
    //$id_sondaggio = 1; 

    $contenuto = array();
    
    $utenti = array();

    $opzioni = array();
    
    $n_opzioni = array();


    $query = "SELECT count(DISTINCT p.Voto) as cont FROM opzioni as o JOIN partecipanti as p ON o.Id = p.Voto WHERE o.Sondaggio = $id_sondaggio";
    $res1 = mysqli_query($conn, $query);
    while($row = mysqli_fetch_assoc($res1))  {
        $n_opzioni = $row;
    }




    $query = "SELECT Opzione
    FROM opzioni
    WHERE Sondaggio = $id_sondaggio";
    $res2 = mysqli_query($conn, $query);
    while($row = mysqli_fetch_assoc($res2))  {
        $opzioni[] = $row;
    }
    


//    echo $n_opzioni['cont']; 

    for( $i=1; $i <= $n_opzioni['cont']; $i++ ) {    
        $query = ("SELECT u.Username , p.Voto, o.Opzione
        FROM partecipanti as p  JOIN utenti as u ON u.Id = p.Utente     JOIN opzioni as o ON p.voto = o.Id 
        WHERE p.Utente IN (SELECT p.Utente FROM opzioni as o JOIN partecipanti as p ON o.Id = p.Voto WHERE o.Sondaggio = $id_sondaggio AND p.voto = $i)
        AND p.Voto IN (SELECT p.Voto FROM opzioni as o JOIN partecipanti as p ON o.Id = p.Voto WHERE o.Sondaggio = $id_sondaggio AND p.voto = $i)
        ORDER BY o.Opzione");
        
        
        $res3 = mysqli_query($conn, $query);
        while($row = mysqli_fetch_assoc($res3))  {
            $utenti[] = $row;
        }    
    }

    $contenuto['utenti'] = $utenti;
    $contenuto['opzioni'] = $opzioni;

    //libero spazio occupato dai risultati di una query
    mysqli_free_result($res1);
    mysqli_free_result($res2);
    mysqli_free_result($res3);


    //chiusura della connessione
    mysqli_close($conn);

    //ritorno il json
    echo json_encode($contenuto);


    //noto che: p.voto è una informazione ridondante
?>
