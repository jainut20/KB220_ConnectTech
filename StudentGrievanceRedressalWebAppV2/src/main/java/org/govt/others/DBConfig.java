/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.govt.others;

import java.sql.Connection;
import java.sql.DriverManager;

/**
 *
 * @author Pravesh Ganwani
 */
public class DBConfig {
    public static Connection getConnection() {
        Connection con = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con=DriverManager.getConnection("jdbc:mysql://sihdb.c3vyqhzl6aif.us-east-1.rds.amazonaws.com:3306/sgradb","sihadmin","sihdb123");
        } catch (Exception e) {
            System.out.println(e);
        }
        
        return con;
    }
    
    public static String getDriverName(){
        return "com.mysql.cj.jdbc.Driver";
    }
    
    public static String getUrl() {
        return "jdbc:mysql://sihdb.c3vyqhzl6aif.us-east-1.rds.amazonaws.com:3306/sgradb";
    }
    
    public static String getUsername() {
        return "sihadmin";
    }
    
    public static String getPassword() {
        return "sihdb123";
    }
    
    public static String getApiHost() {
        return "http://sgrprestservice-env.eba-njsui4dk.us-east-1.elasticbeanstalk.com/webapi";
    }
}
