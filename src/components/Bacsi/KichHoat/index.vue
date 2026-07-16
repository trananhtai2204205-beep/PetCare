<template>

</template>
<script>
import axios from 'axios';
// export default {
//     props: ['ma_code'],
//     data() {
//         return {
//             ma_code: this.$route.params.ma_code,
//         }
//     },
//     mounted() {
//         this.kichHoat();
//     },
//     methods: {
//         kichHoat() {
//             var payload = {
//                 ma_code: this.ma_code,
//             };
//             axios
//                 .post(`http://localhost:8000/api/bac-si/kich-hoat`, payload)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message);
//                         this.$router.push('/bac-si/login');
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((err) => {
//                     console.log(err);

//                 });
//         }
//     },
// }
</script>
<style></style>