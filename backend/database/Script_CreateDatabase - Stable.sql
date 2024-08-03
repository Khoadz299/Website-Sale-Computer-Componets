-- Tạo bảng Account
CREATE TABLE Account (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE CHECK (username ~ '^[a-zA-Z0-9]+$'),
    password VARCHAR(256) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user'
);	-- Dùng enum báo lỗi kiểu này không tồn tại
 
-- Bảng product chung
CREATE TABLE Products (
    product_id VARCHAR(50) PRIMARY KEY,
    product_type VARCHAR(50) NOT NULL CHECK (product_type IN ('CPU', 'VGA', 'MONITOR', 'RAM', 'PSU', 'STORAGE')),
	status VARCHAR(50) CHECK (status IN ('Hiển thị', 'Hết hàng' , 'Liên hệ')) DEFAULT 'Hiển thị'
);
-- Tạo bảng Product_CPU
CREATE TABLE Product_CPU (
    id VARCHAR(50) PRIMARY KEY REFERENCES Products(product_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    socket VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > -1)  DEFAULT 0,
    price INT NOT NULL CHECK (price > -1)  DEFAULT 100000000
);

-- Tạo bảng Product_RAM
CREATE TABLE Product_RAM (
    id VARCHAR(50) PRIMARY KEY REFERENCES Products(product_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    capacity VARCHAR(50) NOT NULL,
    bus_speed VARCHAR(50) NOT NULL,
    model VARCHAR(100) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > -1)  DEFAULT 0,
    price INT NOT NULL CHECK (price > -2)  DEFAULT 100000000
);

-- Tạo bảng Product_VGA
CREATE TABLE Product_VGA (
    id VARCHAR(50) PRIMARY KEY REFERENCES Products(product_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    memory VARCHAR(50) NOT NULL,
    gpu_chip VARCHAR(50) NOT NULL,
    memory_type VARCHAR(50) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > -1)  DEFAULT 0,
    price INT NOT NULL CHECK (price > -1)  DEFAULT 100000000
);

-- Tạo bảng Product_PSU
CREATE TABLE Product_PSU (
    id VARCHAR(50) PRIMARY KEY REFERENCES Products(product_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    standard VARCHAR(50) NOT NULL,
    power VARCHAR(50) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > -1)  DEFAULT 0,
    price INT NOT NULL CHECK (price > -2)  DEFAULT 100000000 
);

-- Tạo bảng Product_Monitor
CREATE TABLE Product_Monitor (
    id VARCHAR(50) PRIMARY KEY REFERENCES Products(product_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    resolution VARCHAR(50) NOT NULL,
    screen_size VARCHAR(50) NOT NULL,
    panel_type VARCHAR(50) NOT NULL,
    refresh_rate VARCHAR(50) NOT NULL,
    response_time VARCHAR(50) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > -1)  DEFAULT 0,
    price INT NOT NULL CHECK (price > -1)  DEFAULT 100000000 
);

-- Tạo bảng Product_Storage
CREATE TABLE  Product_Storage (
    id VARCHAR(50) PRIMARY KEY REFERENCES Products(product_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    capacity VARCHAR(50) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > -1)  DEFAULT 0,
    price INT NOT NULL CHECK (price > -1)  DEFAULT 100000000 
);

CREATE TABLE List_Image_Product (
    product_id VARCHAR(50) ,
    url VARCHAR(255) NOT NULL,
    order_image INT NOT NULL CHECK (order_image > -1),
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE,
	CONSTRAINT unique_product_id_url UNIQUE (product_id, url),
	CONSTRAINT unique_product_id_order UNIQUE (product_id, order_image)
);

CREATE TABLE CART(
	account_id INT ,
    product_id VARCHAR(50) , 
	quantity INT NOT NULL CHECK (quantity > 0),
	FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE,
	FOREIGN KEY (account_id) REFERENCES Account(id)
)

-- Tạo bảng Bill_Info
CREATE TABLE Bill_Info (
    id SERIAL PRIMARY KEY,	
    account_id INT NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL CHECK (email ~ '^[^@]+@[^@]+\.[^@]+$') ,
    address VARCHAR(255) NOT NULL,
    invoice_date TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP, -- TIMESTAMP(0) không hiển thị số thập phân sau  đơn vị giây 
    total_money INT NOT NULL CHECK (total_money > -1),
	status VARCHAR(100) NOT NULL CHECK (status IN ('Chờ', 'Chấp nhận' , 'Từ chối', 'Thành công' ,'Hủy đơn' ,'Hoàn trả')) DEFAULT 'Chờ',
	note VARCHAR(255),
    FOREIGN KEY (account_id) REFERENCES Account(id)
);

-- Tạo bảng Bill_Detail
CREATE TABLE  Bill_Detail (
    id SERIAL PRIMARY KEY,
    bill_info_id INT NOT NULL,
    product_id VARCHAR(50),
    quantity INT NOT NULL CHECK (quantity > 0),
    price INT NOT NULL CHECK(price > -1),
    FOREIGN KEY (bill_info_id) REFERENCES Bill_Info(id),
	FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
