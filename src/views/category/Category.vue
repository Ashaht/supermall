<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <li>商品详情1</li>
      <li>商品详情2</li>
      <li>商品详情3</li>
      <li>商品详情4</li>
      <li>商品详情5</li>
      <li>商品详情6</li>
      <li>商品详情7</li>
      <li>商品详情8</li>
      <li>商品详情9</li>
      <li>商品详情10</li>
      <li>商品详情11</li>
      <li>商品详情12</li>
      <li>商品详情13</li>
      <li>商品详情14</li>
      <li>商品详情15</li>
      <li>商品详情16</li>
      <li>商品详情17</li>
      <li>商品详情18</li>
      <li>商品详情19</li>
      <li>商品详情20</li>
      <li>商品详情21</li>
      <li>商品详情22</li>
      <li>商品详情23</li>
      <li>商品详情24</li>
      <li>商品详情25</li>
      <li>商品详情26</li>
      <li>商品详情27</li>
      <li>商品详情28</li>
      <li>商品详情29</li>
      <li>商品详情30</li>
      <li>商品详情31</li>
      <li>商品详情32</li>
      <li>商品详情33</li>
      <li>商品详情34</li>
      <li>商品详情35</li>
      <li>商品详情36</li>
      <li>商品详情37</li>
      <li>商品详情38</li>
      <li>商品详情39</li>
      <li>商品详情40</li>
      <li>商品详情41</li>
      <li>商品详情42</li>
      <li>商品详情43</li>
      <li>商品详情44</li>
      <li>商品详情45</li>
      <li>商品详情46</li>
      <li>商品详情47</li>
      <li>商品详情48</li>
      <li>商品详情49</li>
      <li>商品详情50</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Category",
  data() {
    return {
      scroll: null
    }
  },
  create() {
    
  },
  mounted() {
    this.scroll = new BScroll(document.querySelector('.wrapper'), {

    });
  }
}
</script>

<style scoped>
.wrapper {
  position: absolute;
  height: 150px;
  left: 0;
  top: 0;
  overflow: hidden;
}
</style>