<%-- 
    Document   : admin-dashboard
    Created on : 29 Jul, 2020, 9:28:46 PM
    Author     : Pravesh Ganwani
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
    <jsp:include page="/AdminDashboard"/>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Dashboard | Admin</title>
        <link href="css/dashboard.css" rel="stylesheet" type="text/css"/>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
        <script>
            <c:forEach items="${unverified}" var="unverified" varStatus="loop">
                    $(document).ready(function() {
                        $('#${unverified.studentId}').on('click', function() {
                            var url = "VerificationServlet?verificationId=${unverified.committeeId}";
                
                            var xhttp=new XMLHttpRequest();
                            xhttp.onreadystatechange=function()
                            {
                                if(xhttp.readyState==4 && xhttp.status==200)
                                {
                                    document.getElementById('${unverified.committeeId}').innerHTML="Verified";
                                    document.getElementById('${unverified.committeeId}').classList.add("btn-disabled");
                                }
                            };

                            xhttp.open("get",url, true);
                            xhttp.send();
                        });
                    });
                </c:forEach>
        </script>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script type="text/javascript">
          google.charts.load("current", {packages:["corechart"]});
          google.charts.setOnLoadCallback(drawChart);
          function drawChart() {
            var data = google.visualization.arrayToDataTable([
              ['Type', 'No. of Complaints'],
              ['No. of Solved Grievances = ${solved}',   parseInt("${solved}")],
              ['No. of Pending Grievances = ${pendings}',  parseInt("${pendings}")],
            ]);

            var options = {
              title: 'Portal Statistics',
              is3D: false,
              fontSize: 20,
              fontName: 'Nunito Sans',
              backgroundColor: { fill:'transparent' },
              chartArea : { left: "0%" },
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
            chart.draw(data, options);
          }
        </script>
    </head>
    <body>
        <jsp:include page="header.jsp"/>
            <div class="container maxwidth mt-5">
                <div class="ux-vertical-tabs">
                        <div class="tabs">
                            <button data-tab="tab1" class="active"><strong><i class="fa fa-chart-bar fa-lg pr-3"></i>Portal Statistics</strong><span></span></button>
                            <button data-tab="tab3"><strong><i class="fas fa-university fa-lg pr-3"></i>Verify Universities</strong><span></span></button>
                            <button data-tab="tab2"><strong><i class="fas fa-user-lock fa-lg pr-3"></i>Register A New Admin</strong><span></span></button>
                            <button data-tab="tab4"><strong><i class="fa fa-id-card fa-lg pr-3"></i>Your Profile</strong><span></span></button>
                            <button class="empty"></button>
                        </div>
                        <div class="maincontent">
                                <div data-tab="tab1" class="tabcontent active">
                                        <div class="ux-text">
                                                <h2><i class="fas fa-chart-pie pr-3"></i>Statistics of Complaints</h2>
                                                <div id="piechart_3d" style="width: 800px; height: 300px; text-align: left;"></div>
                                        </div>
                                </div>
                            
                                <div data-tab="tab2" class="tabcontent">
                                        <div class="ux-text">
                                                <h2><i class="fas fa-users-cog pr-3"></i>Register A New Admin</h2>
                                        </div>
                                </div>
                            
                                <div data-tab="tab3" class="tabcontent">
                                        <div class="ux-text">
                                                <h2><i class="fas fa-sitemap pr-3"></i>List Of Unverified Universities</h2>
                                                <table class="table table-bordered">
                                                    <thead>
                                                      <tr>
                                                        <th scope="col">#</th>
                                                            <th scope="col">University ID</th>
                                                            <th scope="col">University Name</th>
                                                            <th scope="col">University Email</th>
                                                            <th scope="col">Actions</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                        <c:forEach items="${unverified}" var="unverified" varStatus="loop">
                                                        <tr>
                                                            <th scope="row">${loop.index+1}</th>
                                                            <td>${unverified.committeeId}</td>
                                                            <td>${unverified.committeeName}</td>
                                                            <td>${unverified.committeeEmail}</td>
                                                            <td><a class="btn btn-success" style="color: white;" id="${unverified.committeeId}"><i class="fa fa-check pr-2"></i>Verify</a></td>
                                                        </tr>
                                                      </c:forEach>
                                                      <tfoot>
                                                        <tr>
                                                            <td colspan="5" class="text-center">Data retrieved from Committee Database.</td>
                                                        </tr>
                                                      </tfoot>
                                                    </tbody>
                                                </table>
                                        </div>
                                </div>
                            
                                <div data-tab="tab4" class="tabcontent">
                                        <div class="ux-text">
                                                <h2><i class="fas fa-info-circle pr-3"></i>Your Details</h2>
                                                <div class="mb-3 mt-3">
                                                    <a href="#" class="btn btn-primary"><i class="fas fa-pen pr-3"></i>Edit Your Details</a>
                                                </div>
                                                <table class="table mt-4">
                                                    <tbody>
                                                      <tr>
                                                        <th><i class="fas fa-users pr-3"></i>Admin Name</th>
                                                        <td>${user.adminDetails.adminName}</td>
                                                      </tr>
                                                      <tr>
                                                        <th><i class="fas fa-at pr-3"></i>Admin Email</th>
                                                        <td>${user.adminDetails.adminEmailId}</td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                        </div>
                                </div>
                        </div>
                </div>
        </div>
        <!-- partial -->
        <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/animejs/2.2.0/anime.min.js'></script>
        <script src="js/dashboard.js" type="text/javascript"></script>
        <jsp:include page="footer.jsp"/>
    </body>
</html>
