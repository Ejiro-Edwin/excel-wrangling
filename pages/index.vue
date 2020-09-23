<template>
  <div class="container">
 <a class="btn btn-smallie" @click="modalNew=true">New Industry</a>



         <table>
            <thead>
              <tr>
                <th>SN</th>
                <th>Industry</th>
                <th>Company</th>
                <th>Symbol</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(results, i) in datas" :key="i + 1">
                <td>{{ i+1 }}</td>
                <td>{{ results.industry_id }}</td>
                <td>{{ results.company_name }}</td>
                <td>{{ results.symbol }}</td>
                <td>{{ results.IsDelete ? "Not Active" : "Active" }}</td>
                <!-- <td>
                  <span>
                    <button class="btn btn-small" @click.prevent="seeUpdateInfo(i)">Edit</button>
                  </span>
                </td> -->
              </tr>
            </tbody>
          </table>




        <div class="modal" id="modal-one" v-if="modalNew">
          <div class="modal-dialog">
            <div class="modal-header">
              <h2>New Company</h2>
              <a href="#" class="btn-close" @click="modalNew = false">×</a>
            </div>
            <div class="modal-body">
             <div>
                <label>Industry</label>
                <input type="text" v-model="name" />
              </div>
              <div>
                <label>Company</label>
                <input type="text" v-model="name" />
              </div>
                <div>
                <label>Symbol</label>
                <input type="text" v-model="name" />
              </div>
              </div>

            <div class="modal-footer">
                  <button type="submit" class="btn" @click.prevent="submitRequests">Add</button>
            </div>
          </div>
        </div>
            <div class="modal" id="modal-one" v-if="modalOpen">
          <div class="modal-dialog">
            <div class="modal-header">
              <h2>Edit Rating Sector</h2>
              <a href="#" class="btn-close" @click="modalOpen = false">×</a>
            </div>
            <div class="modal-body">
             <div>
                <label>Rating Sector Name</label>
                <input type="text" v-model="name" />
              </div>

              </div>

            <div class="modal-footer">
                  <button type="submit" class="btn" @click.prevent="">Add</button>
            </div>
          </div>
        </div>
      </div>

</template>

<script>
import axios from 'axios'
import {
getCompanies
} from "~/middleware/api";
export default {

  data() {
    return {
      modalNew: false,
      modalOpen:false,
      id: null,
      datas: []
    };
  },
  mounted() {
       getCompanies()
      .then(res => {
        this.datas = res.data.data;
        console.log(this.datas)
      })
      .catch(err => {
        console.log(err);
      });

  },
  methods: {

  }
};
</script>

<style>
.container {
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

  .card {
  border-radius: 20px;
  width: 100%;
  background: #fff;
  padding: 2%;
  flex: 1;
  box-shadow: 1px 1px 4px rgb(207, 207, 207);
  border: solid thin rgb(202, 202, 202);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
}

 .card {
        padding: 20px;
        border: 1px solid tomato;
        border-radius: 4px;
        color: tomato;
}

      .card:first-child {
        grid-area: card1;
      }
      .card:nth-child(2) {
        grid-area: card2;
      }
      .card:nth-child(3) {
        grid-area: card3;
      }
.btn {
  background: darkblue;
  border: #fff solid 1px;
  border-radius: 3px;
  color: #fff;
  display: inline-block;
  font-size: 14px;
  padding: 8px 15px;
  text-decoration: none;
  text-align: center;
  min-width: 60px;
  position: relative;
  transition: color 0.1s ease;
}
.btn.btn-small {
  font-size: 10px;
  padding: 5px 7px;
  min-width: 50px;
}
.btn.btn-smallie {
  font-size: 15px;
  /* padding: 8px 10px;
  min-width: 100px; */
}

.modal {
  content: "";
  display: block;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-dialog {
  background: #fefefe;
  border: #333 solid 1px;
  border-radius: 5px;
  width: 50%;
  height: 47%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.modal-dialog2 {
  background: #fefefe;
  border: #333 solid 1px;
  border-radius: 5px;
  width: 50%;
  height: 48%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.modal-body {
  padding: 15px;
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.modal-body > div {
  width: 50%;
  border: solid thin #aaa;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  -webkit-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.14);
  -moz-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.14);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.14);
}
.modal-header,
.modal-footer {
  padding: 8px 16px;
}
.modal-header {
  border-bottom: #eee solid 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-header h2 {
  font-size: 20px;
}
.modal-footer {
  border-top: #eee solid 1px;
  text-align: right;
}

.modal input,
.modal select,
.modal textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}
table {
         margin-top: 35px;
           padding: 1.0em;
           width: 70%;


}
table th {
  background: darkblue;
  color: #ffffff;
  padding: 1.5em;
  font-size: 1em;
  text-transform: uppercase;
  box-sizing: border-box;
}
table tr:nth-child(even) {
  background: #dfdfdf;
}
table td {
  font-size: 1em;
  padding: 1em;
  text-transform: uppercase;
  box-sizing: border-box;
}
table td:first-child,
table td:nth-child(2),
table td:nth-child(3),
table td:nth-child(4) {
  text-align: center;
}
</style>
