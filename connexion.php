<?php
include('init.php');

// Si l'utilisateur est déjà connecté :
if (isset($_SESSION['membre'])) {
    // Je redirige l'utilisateur sur l'index :
    header('location:index.php');
}

// Si le formulaire a été posté :
if ($_POST) {

    // Je récupère les infos correspondant à l'adresse mail dans la bdd :
    $r = $pdo->query("SELECT * FROM membre WHERE email = '$_POST[email]'");
    // Si j'ai 1 résultat ou plus c'est que le compte existe :
    if ($r->rowCount() >= 1) {
        // ICI le compte existe :
        $content .= '<p>Connexion ok</p>';
        // Je mets sous forme d'array les infos du membre :
        $membre = $r->fetch(PDO::FETCH_ASSOC);
        // Si le mot de passe est correct:
        if (password_verify($_POST['mdp'], $membre['mdp'])) {
            // ICI le mdp est correct :
            $content .= '<p>Mdp OK</p>';
            // On enregistre les infos de l'utilisateur dans la session :
            $_SESSION['membre']['nom'] = $membre['nom'];
            $_SESSION['membre']['prenom'] = $membre['prenom'];
            $_SESSION['membre']['email'] = $membre['email'];
            // Puis on redirige l'utilsateur sur l'accueil :
            header('location:index.php');
        } else {
            // ICI le mdp est incorrect :
            $content .= '<p>Le mot de passe est incorrect.</p>';
        }
    } else {
        // ICI le compte n'existe pas car l'adresse mail n'est pas trouvée :
        $content .= '<p>Adresse mail inexistante.</p>';
    }
}

?>


<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Connexion</title>
</head>

<body>

    <?php echo $content; ?>

    <form method="post">
        <input type="email" name="email" placeholder="Adresse mail">
        <input type="password" name="mdp" placeholder="Mot de passe">
        <input type="submit" value="Se connecter">
    </form>

</body>

</html>