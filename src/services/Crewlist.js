import axios from 'axios'

export const ProductService = {
    getProductsData() {
        return axios.get('http://localhost:8000/api/crewlist').then(res => res.data.crewlist_data)
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    }
};

