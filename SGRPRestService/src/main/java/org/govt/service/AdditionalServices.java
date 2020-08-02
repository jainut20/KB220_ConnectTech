/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.govt.service;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.govt.model.Activity;
import org.govt.model.Committee;
import org.govt.model.Email;
import org.govt.model.NameById;
import org.govt.model.RegistrationEmail;
import org.govt.model.Student;
import org.govt.repository.CommitteeRepository;
import org.govt.repository.StudentRepository;

/**
 *
 * @author Pravesh Ganwani
 */

@Path("additional")
public class AdditionalServices {
    StudentRepository sr = new StudentRepository();
    CommitteeRepository cr = new CommitteeRepository();
    
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON) 
    public NameById getName(@PathParam("id") String id) {
        NameById nbi = null;
        if(sr.getStudent(id) != null) {
            Student s = sr.getStudent(id);
            nbi = new NameById();
            nbi.setName(s.getStudentFullName());
        }
        else if(cr.getCommittee(id) != null) {
            Committee c = cr.getCommittee(id);
            nbi = new NameById();
            nbi.setName(c.getCommitteeName());
        } 
        return nbi;
    }
    
    @POST
    @Path("email")
    @Produces(MediaType.APPLICATION_JSON) 
    public String SendEmail(final Email e) throws Exception {
        String st;
        Thread t1 = new Thread(){
            @Override
            public void run() {
                try {
                    e.sendEmail();
                } catch (Exception ex) {
                    Logger.getLogger(AdditionalServices.class.getName()).log(Level.SEVERE, null, ex);
                }
            } 
        };
        t1.start();
        st = "Sending Mail";
        return st;
    }
    
    @POST
    @Path("registration-email")
    @Produces(MediaType.APPLICATION_JSON) 
    public String SendStaticEmail(final RegistrationEmail e) throws Exception {
        String st;
        Thread t1 = new Thread(){
            @Override
            public void run() {
                try {
                    e.sendEmail();
                } catch (Exception ex) {
                    Logger.getLogger(AdditionalServices.class.getName()).log(Level.SEVERE, null, ex);
                }
            } 
        };
        t1.start();
        st = "Sending Mail";
        return st;
    }
}
