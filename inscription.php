<?php
include('init.php');

// Si l'utilisateur est déjà connecté :
if (isset($_SESSION['membre'])) {
    // Je redirige l'utilisateur sur l'index :
    header('location:index.php');
}

// Si le form a été posté :
if ($_POST) {
    // Je vérifie que je récupère bien les infos :
    // print_r($_POST);

    // Je définie une variable pour stocker les messages d'erreur :
    $erreur = '';

    // Si le prenom est trop court ou trop long :
    if (strlen($_POST['prenom']) < 3 || strlen($_POST['prenom']) > 20) {
        $erreur .= '<p>Votre prénom est trop court ou trop long.</p>';
    }

    // Je vérifie si l'email n'existe pas déjà dans ma base :
    $r = $pdo->query("SELECT * FROM membre WHERE email = '$_POST[email]'");
    // S'il y a un ou plusieurs résultats :
    if ($r->rowCount() >= 1) {
        $erreur .= '<p>Votre adresse mail est déjà utilisée.</p>';
    }

    // Pour chaque champs, je gère les soucis d'apostrophe :
    foreach ($_POST as $indice => $valeur) {
        $_POST[$indice] = addslashes($valeur);
    }

    // Je hash le mot de passe :
    $_POST['mdp'] = password_hash($_POST['mdp'], PASSWORD_DEFAULT);

    // Si la variable $erreur est vide :
    if (empty($erreur)) {
        // Je fais ma requête d'insertion :
        $pdo->exec("INSERT INTO membre (nom, prenom, email, mdp) VALUES ('$_POST[nom]', '$_POST[prenom]', '$_POST[email]', '$_POST[mdp]')");
        // J'ajoute un message de succès :
        $content .= '<p>Inscription validée !</p>';
    }

    $content .= $erreur;
}

?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Inscription</title>
</head>

<body>

    <?php echo $content; ?>

    <form method="post">
        <input type="text" name="nom" placeholder="Nom">
        <br><br>
        <input type="text" name="prenom" placeholder="Prénom">
        <br><br>
        <input type="email" name="email" placeholder="Adresse mail" required>
        <br><br>
        <input type="password" name="mdp" placeholder="Mot de passe" required>
        <br><br>
        <input type="submit" value="S'inscrire">
    </form>

</body>

</html>