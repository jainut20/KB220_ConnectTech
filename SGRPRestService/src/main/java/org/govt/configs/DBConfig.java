package org.govt.configs;


import java.sql.Connection;
import java.sql.DriverManager;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Pravesh Ganwani
 */
public class DBConfig {
    public static Connection getConnection() {
        Connection con = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
//            jdbc:mysql://sihdb.c3vyqhzl6aif.us-east-1.rds.amazonaws.com:3306/?user=sihadmin
            con=DriverManager.getConnection("jdbc:mysql://sihdb.c3vyqhzl6aif.us-east-1.rds.amazonaws.com:3306/sgradb?useSSL=false","sihadmin","sihdb123");
        } catch (Exception e) {
            System.out.println(e);
        }
        
        return con;
    }
    
    public static String getDriverName(){
        return "com.mysql.jdbc.Driver";
    }
    
    public static String getOldUrl() {
        return "jdbc:mysql://sihdb.cj0lslk7bqrb.us-east-1.rds.amazonaws.com:3306/sgradb?useSSL=false";
    }
    
    public static String getNewUrl() {
        return "jdbc:mysql://sihdb.c3vyqhzl6aif.us-east-1.rds.amazonaws.com:3306/sgradb?useSSL=false";
    }
    
    public static String getUsername() {
        return "sihadmin";
    }
    
    public static String getPassword() {
        return "sihdb123";
    }
}
