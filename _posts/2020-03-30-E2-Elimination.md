---
title: E2 Elimination
author: Misa
description: Movie of E2 elimination by methoxide.
category: Sample
image: e2-chemdraw.jpeg
---

<!-- > Post date: {{ page.date | date: "%b %-d, %Y" }}
          Dynamics calculation by: {{ page.author}} <br> -->

<section id="about" class="text-left py-3">
  <div class="row">
    <div class="container">
        <div class="col-sm">
            <div class="card">
              <div class="card-body">
                <h3 class="text-center">Reaction Mechanism</h3>
                <h5 class="text-muted text-center">E2 elimination of bromo butane by methoxide.</h5>
                <!-- <p class="text-left">&nbsp;&nbsp;&nbsp;&nbsp; E2 elimination.</p>  -->
                <p style="text-align:center;">
                <img src="{{site.baseurl}}/assets/images/normal/e2-mechanism.jpg" alt="centered image" style="width:600px;height:126px;">
                </p>
              </div>
            </div>
        </div> 
    </div>
  </div>
<br>
<br>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3 class="text-center">Movie of dynamics trajectory</h3>
            <h5 class="text-muted text-center">Major trajectory</h5>
                <p style="text-align:center;">
                <img src="{{site.baseurl}}/assets/images/normal/E2_traj2-21.gif" alt="centered image" style="width:600px;height:480px;">
                </p>
          </div>
        </div>
      </div>
    </div>
  </div>
<br>
<br>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3 class="text-center">Movie of IRC</h3>
            <h5 class="text-muted text-center">IRC of the reaction</h5>
                <p style="text-align:center;">
                <img src="{{site.baseurl}}/assets/images/normal/E2_IRC_loop.gif" alt="centered image" style="width:600px;height:336px;">
                </p>
          </div>
        </div>
      </div> 
    </div>
  </div>
</section>

<br>
<br>

> ##### Keywords and level of theory for the calculation:<br>
###### TS optimization:
<samp>opt=(calcfc,ts,noeigen) freq b3lyp/6-31g(d) scf=xqc</samp> <br>
###### HP freq calculation:
<samp> freq=hpmodes b3lyp/6-31g(d)</samp> <br>
###### IRC calculateon (lqa keyword):
<samp>irc=(calcfc,maxpoints=300,lqa) b3lyp/6-31g(d)</samp> <br>
###### Dynamics:
<samp>progdyn.conf: method b3lyp/6-31g(d), classical 0</samp>

<br>
<br>