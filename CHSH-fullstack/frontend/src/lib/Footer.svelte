<script lang="ts">
	import Status from './Status.svelte';
	import LeaveSession from './LeaveSession.svelte';
</script>


<div class="footer">
    <div class="footer-item">
        <p>Alice|Bob</p>
    </div>
	<div class="footer-item">
		<Status />
	</div>
	<div class="footer-item">
		<LeaveSession />
	</div>
</div>

<style>
	.footer {
		display: flex;
        padding-bottom: 0vh;
		justify-content: center;
	}
	.footer-item {
		margin: 5px;
        
	}
</style>
