document.addEventListener('DOMContentLoaded', function() {
    const videoGrid = document.getElementById('videoGrid');
    const trendingGrid = document.getElementById('trendingGrid');
    const homepage = document.getElementById('homepage');
    const trendingPage = document.getElementById('trendingPage');
    const downloadPage = document.getElementById('downloadPage');
    const accountPage = document.getElementById('accountPage');
    const videoPlayer = document.getElementById('videoPlayer');
    const mainVideo = document.getElementById('mainVideo');
    const playerTitle = document.getElementById('playerTitle');
    const playerViews = document.getElementById('playerViews');
    const playerDate = document.getElementById('playerDate');
    const channelName = document.getElementById('channelName');
    const channelSubs = document.getElementById('channelSubs');
    const relatedVideosContainer = document.getElementById('relatedVideosContainer');
    const downloadBtn = document.getElementById('downloadBtn');
    const videoNumber = document.getElementById('videoNumber');
    const generateDownload = document.getElementById('generateDownload');
    const downloadLink = document.getElementById('downloadLink');
    const downloadUrl = document.getElementById('downloadUrl');
    const videoNumberInput = document.getElementById('videoNumberInput');
    const goToVideo = document.getElementById('goToVideo');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const adsOverlay = document.getElementById('adsOverlay');
    const adsButton = document.getElementById('adsButton');
    const closeAds = document.getElementById('closeAds');
    const adsTitle = document.getElementById('adsTitle');
    const adsDescription = document.getElementById('adsDescription');
    
    // 10 Different Ads
    const ads = [
        {
            title: "Special Offer!",
            description: "Limited time discount on our premium services",
            url1: "https://example.com",
            url2: "https://example2.com"
        },
        {
            title: "New Collection!",
            description: "Check out our latest video collection",
            url1: "https://collection1.com",
            url2: "https://collection2.com"
        },
        {
            title: "Premium Access",
            description: "Get exclusive access to premium content",
            url1: "https://premium1.com",
            url2: "https://premium2.com"
        },
        {
            title: "Summer Sale!",
            description: "Up to 50% off on all video packages",
            url1: "https://sale1.com",
            url2: "https://sale2.com"
        },
        {
            title: "VIP Membership",
            description: "Join our VIP program for exclusive benefits",
            url1: "https://vip1.com",
            url2: "https://vip2.com"
        },
        {
            title: "Limited Time Deal",
            description: "Don't miss this amazing opportunity",
            url1: "https://deal1.com",
            url2: "https://deal2.com"
        },
        {
            title: "New Features!",
            description: "Discover our latest platform features",
            url1: "https://features1.com",
            url2: "https://features2.com"
        },
        {
            title: "Exclusive Content",
            description: "Access content not available anywhere else",
            url1: "https://exclusive1.com",
            url2: "https://exclusive2.com"
        },
        {
            title: "Special Discount",
            description: "50% off for first-time users",
            url1: "https://discount1.com",
            url2: "https://discount2.com"
        },
        {
            title: "Premium Upgrade",
            description: "Upgrade your account for better experience",
            url1: "https://upgrade1.com",
            url2: "https://upgrade2.com"
        }
    ];

    // Generate large amount of video data (1000 videos)
    function generateVideoData(count) {
        const videoData = [];
        
        for (let i = 1; i <= count; i++) {
            const randomViews = Math.floor(Math.random() * 1000000) + 1000;
            // Generate recent time (1 hour to 30 days)
            const timeOptions = [
                { value: Math.floor(Math.random() * 24) + 1, unit: 'hour' },
                { value: Math.floor(Math.random() * 7) + 1, unit: 'day' },
                { value: Math.floor(Math.random() * 4) + 1, unit: 'week' }
            ];
            const randomTime = timeOptions[Math.floor(Math.random() * timeOptions.length)];
            
            const thumbnail = `https://picsum.photos/400/225?random=${i}`;
            
            videoData.push({
                id: i,
                title: `VIDEO POST NO ${i}`,
                channel: "sa18prive.site",
                views: randomViews,
                formattedViews: randomViews.toLocaleString(),
                time: randomTime,
                duration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
                thumbnail: thumbnail
            });
        }
        
        return videoData;
    }

    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    function formatTime(timeObj) {
        if (timeObj.unit === 'hour') {
            return `${timeObj.value} ${timeObj.value === 1 ? 'hour' : 'hours'} ago`;
        } else if (timeObj.unit === 'day') {
            return `${timeObj.value} ${timeObj.value === 1 ? 'day' : 'days'} ago`;
        } else {
            return `${timeObj.value} ${timeObj.value === 1 ? 'week' : 'weeks'} ago`;
        }
    }

    // Generate 1000 videos
    const allVideos = generateVideoData(1000);
    let currentPage = 0;
    const videosPerPage = 15;
    let allVideosLoaded = false;

    function loadMoreVideos() {
        if (allVideosLoaded) {
            loadMoreBtn.disabled = true;
            loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> All Videos Loaded';
            return;
        }
        
        const startIndex = currentPage * videosPerPage;
        const endIndex = startIndex + videosPerPage;
        
        // Show loading state
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        loadMoreBtn.disabled = true;
        
        // Get videos - always random for homepage
        let videosToShow = shuffleArray(allVideos).slice(startIndex, endIndex);
        
        if (videosToShow.length === 0) {
            allVideosLoaded = true;
            loadMoreBtn.disabled = true;
            loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> All Videos Loaded';
            return;
        }
        
        // Simulate loading delay
        setTimeout(() => {
            videosToShow.forEach(video => {
                const videoCard = createVideoCard(video);
                videoGrid.appendChild(videoCard);
            });
            
            currentPage++;
            
            // Reset button state
            loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> SEE MORE VIDEOS';
            loadMoreBtn.disabled = false;
            
            if (endIndex >= allVideos.length) {
                allVideosLoaded = true;
                loadMoreBtn.disabled = true;
                loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> All Videos Loaded';
            }
        }, 1000);
    }
    
    function createVideoCard(video) {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <div class="thumbnail-container">
                <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail">
                <div class="video-duration">${video.duration}</div>
            </div>
            <div class="video-info">
                <div class="channel-avatar">S</div>
                <div class="video-details">
                    <div class="video-title">${video.title}</div>
                    <div class="video-meta">
                        <span>${video.channel}</span>
                        <span>${video.formattedViews} views • ${formatTime(video.time)}</span>
                    </div>
                </div>
            </div>
        `;
        
        videoCard.addEventListener('click', () => {
            openVideoPlayer(video);
        });
        
        return videoCard;
    }
    
    function displayTrendingVideos() {
        const trendingVideos = [...allVideos]
            .sort((a, b) => b.views - a.views)
            .slice(0, 10);
        
        trendingVideos.forEach(video => {
            const videoCard = createVideoCard(video);
            trendingGrid.appendChild(videoCard);
        });
    }
    
    function openVideoPlayer(video) {
        // Stop any currently playing video
        mainVideo.pause();
        mainVideo.currentTime = 0;
        
        homepage.style.display = 'none';
        trendingPage.style.display = 'none';
        downloadPage.style.display = 'none';
        accountPage.style.display = 'none';
        videoPlayer.style.display = 'block';
        
        playerTitle.textContent = video.title;
        playerViews.textContent = `${video.formattedViews} views`;
        playerDate.textContent = formatTime(video.time);
        channelName.textContent = video.channel;
        channelSubs.textContent = `${Math.floor(Math.random() * 5) + 1}M subscribers`;
        
        // Set video source to match video number
        mainVideo.src = `https://watchmp4.github.io/media/videos/${video.id}.mp4`;
        
        generateRelatedVideos(video);
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        mainVideo.play().catch(e => {
            console.log("Auto-play was prevented:", e);
        });
    }
    
    function generateRelatedVideos(currentVideo) {
        relatedVideosContainer.innerHTML = '';
        
        const relatedVideos = shuffleArray(allVideos.filter(v => v.id !== currentVideo.id)).slice(0, 8);
        
        relatedVideos.forEach(video => {
            const videoCard = createVideoCard(video);
            relatedVideosContainer.appendChild(videoCard);
        });
    }
    
    // Stop video when switching pages
    function stopVideo() {
        if (mainVideo) {
            mainVideo.pause();
            mainVideo.currentTime = 0;
        }
    }
    
    // Ads functionality
    function showRandomAd() {
        const randomAd = ads[Math.floor(Math.random() * ads.length)];
        adsTitle.textContent = randomAd.title;
        adsDescription.textContent = randomAd.description;
        
        // Update ads button click handler
        adsButton.onclick = function() {
            window.open(randomAd.url1, '_blank');
            window.open(randomAd.url2, '_blank');
            adsOverlay.style.display = 'none';
        };
        
        adsOverlay.style.display = 'flex';
    }
    
    function setupAdsTimer() {
        // Show random ads every 2 minutes (120000 milliseconds)
        setInterval(showRandomAd, 120000);
    }
    
    downloadBtn.addEventListener('click', () => {
        const title = playerTitle.textContent;
        const videoNumMatch = title.match(/VIDEO POST NO (\d+)/);
        if (videoNumMatch) {
            const videoNum = videoNumMatch[1];
            videoNumber.value = videoNum;
            showPage('downloadPage');
            generateDownloadLink(videoNum);
        }
    });
    
    function generateDownloadLink(videoNum) {
        const url = `https://watchmp4.github.io/media/videos/${videoNum}.mp4`;
        downloadUrl.href = url;
        
        generateDownload.innerHTML = '<i class="fas fa-check"></i> Done';
        generateDownload.classList.add('done');
        
        downloadLink.style.display = 'block';
    }
    
    generateDownload.addEventListener('click', () => {
        const videoNum = videoNumber.value;
        if (videoNum && videoNum >= 1 && videoNum <= 1000) {
            generateDownloadLink(videoNum);
        } else {
            alert('Please enter a valid video number between 1 and 1000');
        }
    });
    
    goToVideo.addEventListener('click', () => {
        const videoNum = parseInt(videoNumberInput.value);
        if (videoNum && videoNum >= 1 && videoNum <= 1000) {
            const video = allVideos.find(v => v.id === videoNum);
            if (video) {
                openVideoPlayer(video);
            } else {
                alert('Video not found. Please try another number.');
            }
        } else {
            alert('Please enter a valid video number between 1 and 1000');
        }
    });
    
    videoNumberInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            goToVideo.click();
        }
    });
    
    // Load more button event
    loadMoreBtn.addEventListener('click', loadMoreVideos);
    
    // Ads events
    closeAds.addEventListener('click', function() {
        adsOverlay.style.display = 'none';
    });
    
    function showPage(pageId) {
        // Stop video when switching pages
        stopVideo();
        
        homepage.style.display = 'none';
        trendingPage.style.display = 'none';
        downloadPage.style.display = 'none';
        accountPage.style.display = 'none';
        videoPlayer.style.display = 'none';
        
        document.getElementById(pageId).style.display = 'block';
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            if (this.dataset.page) {
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                showPage(this.dataset.page);
            }
        });
    });
    
    // Initialize the app
    loadMoreVideos(); // Load initial videos
    displayTrendingVideos();
    setupAdsTimer(); // Start ads timer

});
