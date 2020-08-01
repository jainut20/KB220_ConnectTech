/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.govt.configs;

import java.util.Iterator;
import java.util.List;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.glassfish.jersey.client.ClientConfig;
import org.glassfish.jersey.logging.LoggingFeature;
import org.govt.model.Committee;
import org.govt.model.Status;
import org.govt.model.Student;

import io.github.crew102.rapidrake.RakeAlgorithm;
import io.github.crew102.rapidrake.data.SmartWords;
import io.github.crew102.rapidrake.model.RakeParams;
import io.github.crew102.rapidrake.model.Result;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.net.URL;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.govt.repository.GrievanceRepository;

/**
 *
 * @author Pravesh Ganwani
 */
public class TestClass {
    
    public static void main(String[] args) throws Exception{
//        Client client = ClientBuilder.newClient( new ClientConfig().register( LoggingFeature.class ) );
//        WebTarget webTarget = client.target("http://sgrprestservice-env.eba-mmpfxiym.us-east-1.elasticbeanstalk.com/webapi").path("committees");
//
//        Invocation.Builder invocationBuilder =  webTarget.request(MediaType.APPLICATION_JSON);
//        Response response = invocationBuilder.get();
//
//        List<Committee> listOfCommittees = response.readEntity(new GenericType<List<Committee>>(){});
//
//        System.out.println(response.getStatus());
//        for (Iterator<Committee> i = listOfCommittees.iterator(); i.hasNext();) {
//            Committee c = i.next();
//            System.out.println(c.getCommitteeName());
//            System.out.println("\n");
//        }
//        Client client = ClientBuilder.newClient( new ClientConfig().register( LoggingFeature.class ) );
//        WebTarget webTarget = client.target("http://sgrprestservice-env.eba-mmpfxiym.us-east-1.elasticbeanstalk.com/webapi").path("students/student");

//        Committee c = new Committee();
//        c.setCommitteeName("Demo Committee 1");
//        c.setCommitteeType("univ");
//        c.setCommitteeEmail("democommittee1@gmail.com");
//        c.setCommitteePassword("democommittee@123");
//        c.setIsVerified(0);
//        c.setIsActive(1);
//        c.setParentId("0");
//        c.setCommitteeContact("2222222222");

//            Student sd = new Student();
//            sd.setStudentFirstName("Dummy");
//            sd.setStudentMiddleName("Student");
//            sd.setStudentLastName("1");
//            sd.setCourseId(Integer.parseInt("1"));
//            sd.setStudentUID("2018140011");
//            sd.setStudentEmail("dummy@gmail.com");
//            sd.setStudentPassword("dummy123");
//            sd.setInstituteId("INST4600CCqc");
//            sd.setIsVerified(0);
//            sd.setIsActive(1);

//        Invocation.Builder invocationBuilder =  webTarget.request(MediaType.APPLICATION_JSON);
//        Response response = invocationBuilder.post(Entity.entity(sd, MediaType.APPLICATION_JSON));
//
//        Status st = response.readEntity(Status.class);
//        System.out.println(response.getStatus());
//        System.out.println(st.getStatus());

        // Create an object to hold algorithm parameters
            String[] stopWords = new SmartWords().getSmartWords(); 
            String[] stopPOS = {"VB", "VBD", "VBG", "VBN", "VBP", "VBZ"}; 
            int minWordChar = 1;
            boolean shouldStem = true;
            String phraseDelims = "[-,.?():;\"!/]"; 
            RakeParams params = new RakeParams(stopWords, stopPOS, minWordChar, shouldStem, phraseDelims);
            
            try {
                // Create a RakeAlgorithm object
                
                String POStaggerURL = "\\D:\\SGRPRestService\\target\\SGRPRestService-1.0-SNAPSHOT\\WEB-INF\\classes\\model-bin\\en-pos-maxent.bin"; // The path to your POS tagging model
                String SentDetecURL = "\\D:\\SGRPRestService\\target\\SGRPRestService-1.0-SNAPSHOT\\WEB-INF\\classes\\model-bin\\en-sent.bin";
//                String POStaggerURL = "resources/model-bin/en-pos-maxent.bin"; // The path to your POS tagging model
//                String SentDetecURL = "resources/model-bin/en-sent.bin"; // The path to your sentence detection model
                RakeAlgorithm rakeAlg = new RakeAlgorithm(params, POStaggerURL, SentDetecURL);
//                // Call the rake method
                String txt = "How to harassment the exam fees? Also i am been ragged at Sardar Patel Institute of Technology";
                Result result = rakeAlg.rake(txt);
//                // Print the result
                System.out.println(result.distinct());
                String keywords = result.toString().substring(1, result.toString().length() -1);
                String[] words = keywords.split(", ");
                for(int i = 0; i < words.length; i++) {
                    String word = words[i].replaceAll("\\s\\(.*?\\) ?", "");
                    System.out.println(word+"\n");
                }
                System.out.println(keywords);
                
                BufferedReader br = new BufferedReader(new FileReader("res/stopwords-terrier.txt"));
                String line;
                while((line = br.readLine()) != null) {
//                    System.out.println(line);
//                    System.out.println(txt.contains(line));
                }

//                List<CardKeyword> keywordsList = KeywordsExtractor.getKeywordsList(txt);
//                for(int i=0; i < keywordsList.size(); i++) {
//                    System.out.println(keywordsList.get(i));
//                }
            } catch (Exception e) {
                System.out.println(e);
            }

//            GrievanceRepository gr = new GrievanceRepository();
//            System.out.println(GrievanceRepository.class.getResource("../../").getPath());
//            URL fileUrl = GrievanceRepository.class.getProtectionDomain().getCodeSource().getLocation();
//            File file = new File(fileUrl.toURI());
//            String grandParent = file.getParentFile().getParent();
//            System.out.println(grandParent+"/model-bin/en-pos-maxent.bin");
            String txt = "Guns   on last bench";
//            File RedFlags = new File("res/stopwords-terrier.txt");
//             BufferedReader br = new BufferedReader(new FileReader(RedFlags));
//            String line;
//            int flag = 0;
//            while((line = br.readLine()) != null) {
//                System.out.println(line+"$");
//                if(txt.toLowerCase().contains(line)) {
//                    System.out.println("Red");
//                    flag = 1;
//                    break;
//                }
//            }
//            if(flag == 0) {
//                System.out.println("NO");
//            }
               Pattern pattern = Pattern.compile("\\s\\s\\s");
                Matcher matcher = pattern.matcher(txt);
                boolean found = matcher.find();
                if(found) {
                    System.out.println("found");
                }
                String[] words = txt.split("\\s+");
                for (int i = 0; i < words.length; i++) {
                    // You may want to check for a non-word character before blindly
                    // performing a replacement
                    // It may also be necessary to adjust the character class
                    words[i] = words[i].replaceAll("[^\\w]", "");
                    System.out.println(words[i].length());
                }
                System.out.println("=============mail===========");
		final String username = "stockalertsystem12@gmail.com";
                final String password = "ggWp@123";	
		
                Properties props = new Properties();
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");
		
                Session session = Session.getInstance(props, new javax.mail.Authenticator() {
                  protected PasswordAuthentication getPasswordAuthentication() {
                          return new PasswordAuthentication(username, password);	
                  }
		});

                Message message = new MimeMessage(session);
		message.setFrom(new InternetAddress(username, "Student Grievance Redressal Portal"));
		message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("praveshganwani@gmail.com"));
		message.setSubject("Demo");
		message.setContent(
              "<h1>This is actual message embedded in HTML tags</h1>",
             "text/html");

                Transport.send(message);
                
		System.out.println("Alerts sent");
            
    }
    
}
