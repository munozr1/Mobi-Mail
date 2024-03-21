// Importing necessary modules from the Rust libraries
use std::io::{Read, Write};
use std::io::{TcpListener, TcpStream};

fn handle_client(mut stream: Tcp Stream){
    // This is a buffer to read data from the client
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();
}