<?php
session_start();

include("conexao.php");

if(isset($_POST['validLogin']))
{
    validLogin($mysqli);
}

if(isset($_GET['loggout'])) {
    loggout();
}

if(isset($_POST['pedidos'])) {
    addPedidos($mysqli);
}

if(isset($_GET['editar'])) {
    editPedidos($mysqli);
}

if(isset($_GET['excluir'])) {
    excluir($mysqli);
}

function view($mysqli)
{
    $sql = "SELECT * FROM produtoetec";
    $result = $mysqli->query($sql);

    if ($result === false)
    {
        echo "Erro na consulta: " . $mysqli->error;
        return null;
    }

    return $result;
}

function validLogin($mysqli)
{

    global $mysqli;
    $erro = [];

    if(isset($_POST['emailLogin']) && isset($_POST['senhaLogin']) && !empty($_POST['emailLogin']) && !empty($_POST['senhaLogin']))
    {
        $email = $mysqli->escape_string($_POST['emailLogin']);
        $senha = $_POST['senhaLogin'];

        $sql = "SELECT senhaUsuario, idUsuario FROM cadastroetec WHERE emailUsuario = '$email'";
        $result = $mysqli->query($sql);

        if($result && $result->num_rows == 1)
        {
            $row = $result->fetch_assoc();
            if($row['senhaUsuario'] == $senha)
            {
                $_SESSION['usuario'] = $row['idUsuario'];
                header("Location: sistema.php");
                exit();
            }
            else
            {
                $erro[] = "Senha incorreta";
            }
        }
        else
        {
            $erro[] = "Email não encontrado";
        }
    }
    else
    {
        $erro[] = "Por favor, preencha todos os campos";
    }

    
    $_SESSION['erro_login'] = $erro;
    header("Location: index.php");
    exit();

    $mysqli->close();

}

function loggout()
{
    unset($_SESSION['usuario']);
    header("Location: index.php");
    exit();
}


function addPedidos($mysqli)
{
    $Prod1 =  1;   //$_POST['produto1'];
    $Prod2 =  2;   //$_POST['produto2'];
    $Prod3 =  3;   //$_POST['produto3'];
    $Prod4 =  4;   //$_POST['produto4'];
    $Prod5 =  5;

    $sql = "INSERT INTO produtoetec (Prod1, Prod2, Prod3, Prod4, Prod5) VALUES
    ('$Prod1', '$Prod2', '$Prod3','$Prod4', '$Prod5') ";

    if ($mysqli->query($sql) === true)
    {
        echo "Pedido realizado com sucesso";
    }else
    {
        echo "Erro ao fazer pedido";
    }
    
    $mysqli->close();
}

function editPedidos($mysqli)
{
    if (isset($_POST["id"])) {
        $id = $_POST["id"];
        
        $Prod1 =  1;   //$_POST['produto1'];
        $Prod2 =  2;   //$_POST['produto2'];
        $Prod3 =  3;   //$_POST['produto3'];
        $Prod4 =  4;   //$_POST['produto4'];
        $Prod5 =  5;

        $sql = "UPDATE produtoetec SET Prod1='$Prod1', Prod2='$Prod2', 
        Prod3='$Prod3', Prod4='$Prod4', Prod5='$Prod5' WHERE id_ProdEtec=$id";

        if ($mysqli->query($sql) === true) {
            echo "<script>alert('Produto alterado com sucesso!');</script>";
        } else {
            echo "Erro ao atualizar produto: " . $mysqli->error;
        }
    }
    
    $mysqli->close();
}

function excluir($mysqli)
{
    if (isset($_POST["id"]))
    {
        $id = $_POST["id"];

        $sql = "DELETE FROM produtoetec WHERE id_ProdEtec=$id";

        if ($mysqli->query($sql) === true) {
            echo "<script>alert('Produto apagado com sucesso!');</script>";

            return view($mysqli);
        } else {
            echo "Erro ao apagar produto: " . $mysqli->error;
        }

    }

    $mysqli->close();
}