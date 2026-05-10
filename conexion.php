<?php
// Parámetros de conexión
$host = "localhost";
$usuario = "root";
$contrasena = "";
$base_datos = "comentario";

// Crear conexión
$conexion = new mysqli($host, $usuario, $contrasena, $base_datos);

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Establecer el conjunto de caracteres a utf8
$conexion->set_charset("utf8");
?>
