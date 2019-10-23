<template>
  <div>
    <div>
      <label>
        <select>
          <option v-for="(province,index) in provinceList" :key="province.id"
                  :value="province" @click="chooseProvince(index)">
            {{province.name}}
          </option>
        </select>
      </label>
      <label>
        <select>
          <option v-for="(city, index) in cityList" :key="city.id"
                  :value="city" @click="chooseCity(index)">
            {{city.name}}
          </option>
        </select>
      </label>
      <label>
        <select>
          <option v-for="(area, index) in areaList" :key="area.id"
                  :value="area" @click="chooseArea(index)">
            {{area.name}}
          </option>
        </select>
      </label>
    </div>
    <div style="text-align: left;margin: auto;width:400px">
      你的选择：
      <p>省,直辖市或自治区: <strong>{{province ? province : '待选择' }}</strong></p>
      <p>市或自治州: <b>{{city ? city : '待选择' }}</b></p>
      <p>区,县或自治县: <b>{{area ? area : '待选择' }}</b></p>
    </div>
    <button @click="click()">click</button>
  </div>

</template>
<style>
  select {
    width: 140px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    height: 30px;
    text-align: center;
    border-radius: 4px;
  }

  option {
    font-size: 12px;
  }
</style>
<script>
  export default {
    name: 'index.vue',
    data: function () {
      return {
        provinceList: [],
        cityList: [],
        areaList: [],
        province: '',
        city: '',
        area: ''
      }
    },
    beforeCreate: function () {
      const url = '/yulovexin/file/countryArea.json'
      this.axios.get(url)
        .then(res => {
          this.provinceList = res.data
          this.cityList = this.provinceList[0].cityList
          this.areaList = this.cityList[0].areaList
        })
        .catch(err => {
          console.log('读取json文件错误', err)
        })
    },
    methods: {
      click () {
        const url = '/yulovexin/Data'
        const data = {
          'name': 'zhou',
          'age': 18
        }
        this.axios.get(url, data)
          .then(res => {
            console.log(res.data)
          })
      },
      chooseProvince (index) {
        this.province = this.provinceList[index].name
        this.city = ''
        this.area = ''
        this.cityList = this.provinceList[index].cityList
        this.areaList = this.cityList[0].areaList
        if (this.cityList.length === 1) {
          this.city = this.cityList[0].name
        }
      },
      chooseCity (index) {
        this.city = this.cityList[index].name
        this.area = ''
        this.areaList = this.cityList[index].areaList
      },
      chooseArea (index) {
        this.area = this.areaList[index].name
      }
    }
  }
</script>

<style scoped>

</style>
